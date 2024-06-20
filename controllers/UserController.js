const User = require('../models/User')

exports.addUser = async (req, res) => {
    try {
        const {
            nombres,
            apellido_paterno,
            apellido_materno,
            correo,
            password
        } = req.body

        const nuevoUsuario = new User({
            nombres,
            apellido_paterno,
            apellido_materno,
            correo,
            password
        })

        nuevoUsuario.password = await nuevoUsuario.encryptPassword(nuevoUsuario.password)
        await nuevoUsuario.save()

        res.json({
            mesg: "Usuario registrado con exito"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body

        const usuario = await User.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciales erróneas' })
        }

        const passwordCheck = await usuario.validatePassword(password)
        if (!passwordCheck) {
            return res.status(400).json({ msg: 'Credenciales erróneas' })
        }

        res.json({ msg: 'Login exitoso' })
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error...')
    }
}