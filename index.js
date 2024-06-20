const express = require('express')
const config = require('./config/global')
const cors = require('cors')
const connection = require('./config/database')

const app = express()

connection()

app.use(cors())
app.use(express.json())

app.use('/api/usuario', require('./routes/usuarioRoutes'))

app.listen(config.port, () => {
    console.log(`El servidor esta corriendo en el puerto ${config.port}`)
})