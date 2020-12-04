const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const baseRouter = require('./controllers/base')
const userRouter = require('./controllers/user')
const db = require('./database/database')
const app = express()

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Server",
            description: "Rest API Server",
            contact: {
                name: "Gabriel de Campos"
            },
            servers: ["http://localhost:3005"]
        }
    },
    apis: [".js", "controllers/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(cors())
app.use(express.json())

app.use(function(req, res, next) {
    res.locals.pool = db;
    next()
})

app.use('/users', userRouter)
app.use('/bases', baseRouter)

app.listen(3005, ()=> console.log('API rodando'))