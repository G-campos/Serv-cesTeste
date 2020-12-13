const express = require('express')
const cors = require('cors')
const database = require('./database/connection')
const router = require('./routes/routes')
const logger = require('nodejslogger')

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`) 
    logger.info("Start Server")
})

app.get('/', (req,res) => {
    res.send("Servidor esta rodando")
    logger.info("Request na raiz")
})
logger.init({"file":"logs", "mode":"DIE"})
// logger.debug("Debug logs")
// logger.error("Error logs")