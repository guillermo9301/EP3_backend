const mongoose = require('mongoose')

const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/EP3_BD', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conexion a la BD')

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connection