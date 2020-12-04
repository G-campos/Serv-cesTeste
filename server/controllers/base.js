const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {   
    res.locals.pool.query(`SELECT * FROM bases WHERE ?`, (erro, resultado, campos) => {
      if (erro) {
          throw erro
        } else {
          let bases = resultado.map(elemento => elemento)
          res.send(bases)
        }
    })

})

module.exports = router