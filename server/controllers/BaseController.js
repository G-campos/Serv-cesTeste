const database = require('../database/connection');
const logger = require('nodejslogger');

class BaseController {
    //add
    novoDado (req, res) {
        const { tarefa, descricao, responsavel } = req.body;

        console.log(tarefa, descricao, responsavel);

        database.insert({ tarefa, descricao, responsavel }).table("tbl_base").then(data => {
            console.log(data);
            res.json({ message: "Tarefa criada com sucesso !" });
        }).catch(error => {
            console.log(error);
        });
    }

    //listar por id
    listarFiltroId (req, res) {
        const id = req.body;
        database.select("*").table("tbl_base").where({ id: id }).then(dados => {
            console.log(dados);
            res.json(dados);
        }).catch(error => {
            console.log(error);
            console.error(error);
        });
    }

    //listar Tudo
    listarAll (req, res) {
        database.select("*").table("tbl_base").then(dados => {
            //console.log(dados);
            logger.info('Request em todos os dados da base');
            res.json(dados);
        }).catch(error => {
            console.log(error);
            console.error(error);
        });
    }

    //Lista dados dentro de um periodo
    async listar (req, res) {
        const periodo = req.body.periodo;
        // console.log(req);
        logger.info("Entrada como : " + req.body.periodo );
        
        if (periodo.dataInicio !== '' || periodo.dataInicio !== undefined){
            logger.info("Request Listando dados por :");

            if (periodo.dataFim !== '' || periodo.dataFim !== undefined){
                logger.info("Periodo : " + periodo.dataInicio + " - " + periodo.dataFim);

                await database("tbl_base").whereBetween('DATA', [periodo.dataInicio, periodo.dataFim])
                    .then(dados => {
                        // console.log("Com periodo.dataFim : " + dados);
                        // dados.valido = true;
                        res.json(dados);
                        return;
                    })
                    .catch(error => {
                        console.log(error);
                        console.error(error);
                        logger.error(error);
                        return;
                    });
            } else {
                logger.info("Dia : " + periodo.dataInicio);
                await database("tbl_base").whereBetween('DATA', [periodo.dataInicio, periodo.dataInicio]).then(dados => {
                    // console.log("Sem periodo.dataFim : " + dados);
                    // dados.valido = true;
                    res.json(dados);
                }).catch(error => {
                    console.log(error);
                    console.error(error);
                    logger.error(error);
                });
            }
        } else {
            logger.error("Request falhou !");
            logger.error("Entrada de periodo invalida !");
            res.json({ message: "Data de inicio necessario !" });
            return;
        }
    }


    // Filtrar dados 
    async listarFiltroDados (req, res) {
        const { coluna, filtro } = req.body;
        
        console.log(filtro)
        if (filtro !== ""){
            await database.column({coluna}).select().table("tbl_base").orderBy({filtro}).then(dados => {
                console.log(dados.id);
                res.json(dados);
            }).catch(error => {
                console.log(error);
                console.error(error);
            });
        } else {
            res.json({ message: "Filtro vasio !" });
            res.json({ message: "Passar os campos a ser filtrados no corpo da requisicao !" });
        }
    }

    //atualizar
    atualizarDados (req, res) {
        const id = req.params;
        const { descricao } = req.body;

        database.where({ id: id }).update({ descricao: descricao })
            .table("tbl_base")
            .then(data => {
            res.json({ message: "Tarefa atualizada com sucesso" });
        }).catch(error => {
            console.log(error);
            console.error(error);
        });
    }

    //deletar
    removerDados (req, res) {
        const id = req.params;

        database.where({ id: id })
            .del()
            .table("tbl_base")
            .then(data => {
                res.json({ message: "Tarefa removida com sucesso" });
        }).catch(error => {
            console.log(error);
            console.error(error);
            logger.error(error);
        });
    }
}

module.exports = new BaseController();