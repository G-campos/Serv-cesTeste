const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {   
  res.locals.pool.select().from('bases').timeout(1000)
}),
router.get('/', (req, res) => {   

})

module.exports = router