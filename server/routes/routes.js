const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const BaseController = require('../controllers/BaseController');

//tarefas
router.post('/novaTarefa', TaskController.novaTarefa);
router.get('/tarefas', TaskController.listarTarefas);
router.get('/tarefas/:id', TaskController.listarUmaTarefa);
router.put('/atualizar/tarefa/:id', TaskController.atualizarTarefa);
router.delete('/deletar/tarefa/:id', TaskController.removerTarefa);

//base Services
router.post('/novoDado', BaseController.novoDado);
router.post('/dados', BaseController.listar);
router.get('/dados/all', BaseController.listarAll);
router.get('/dados/:id', BaseController.listarFiltroId);
router.put('/atualizar/dados/:id', BaseController.atualizarDados);
router.delete('/deletar/dados/:id', BaseController.removerDados);

module.exports = router;