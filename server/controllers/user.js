const express = require('express')
const router = express.Router()

router.post('/cadastro', (req, res) => {
    res.locals.pool.query(
        `INSERT INTO users (username) VALUES ('${req.body.email}');`, (erro, resultado, campos) => {
            if (erro) throw erro
            res.send('Cadastrado com Sucesso');
        }
    )
})

router.post('/login', (req, res) => {
    res.locals.pool.query(`SELECT username, id FROM users;`, (erro, resultado, campos) => {
        if (erro) {
            throw erro
        } else {
            let users = resultado.map(elemento => elemento)
            res.send(users)
        }
    })
})

module.exports = router