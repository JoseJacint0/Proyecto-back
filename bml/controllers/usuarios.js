const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');

const { query, querySingle, execute } = require('../../dal/data-access');

let usuarios = null;
let usuario = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Usuarios  */
const getUsuarios = async(req, res) => {

    let usuarios = await query('stp_usuarios_getall');

    if (!usuarios) {
        console.log("BD vacia");
        res.json({
            status: true,
            message: 'Ingresar usuarios',
            data: usuarios
        });
    } else {
        res.json({
            status: true,
            message: 'Usuario',
            data: usuarios
        });
    }

}

/* Obtener UN Usuario por ID */
const getUsuarioId = async(req, res) => {
    const idUsuario = req.params.id;

    try {
        sqlParams = [{
            'name': 'idUsuario',
            'value': idUsuario
        }];

        const usuario = await querySingle('stp_usuarios_getbyid', sqlParams);

        if (!usuario) {
            console.log("Usuario no encontrado");
            res.json({
                status: true,
                message: 'Usuario inexistente',
                data: null
            });
        } else {
            res.json({
                status: true,
                mmessage: 'Usuario encontrado',
                data: usuario
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Usuario no encontrado',
            data: err
        });
    }
}

/* Obtener UN Usuario por EMAIL */
const getUsuarioEmail = async(req, res) => {
    const { email } = req.body;

    try {
        sqlParams = [{
            'name': 'email',
            'value': email
        }];
        console.log(email);

        usuario = await querySingle('stp_usuarios_getbyemail', sqlParams);

        if (!usuario) {
            console.log("Usuario no encontrado");
            res.json({
                status: true,
                message: 'Usuario inexistente',
                data: null
            });
        } else {
            res.json({
                status: true,
                message: 'Usuario encontrado',
                data: usuario
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'Usuario no encontrado',
            data: err
        });
    }
}

/*  Agregar un Usuario (Check encryptation) */
const addUsuario = async(req, res = response) => {
    const { nombre, email, password, imagen } = req.body;

    /* Encryptar password */
    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(password, salt);

    try {
        sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': passwordEncrypted
            },
            {
                'name': 'imagen',
                'value': imagen
            },
            {
                'name': 'local',
                'value': 1
            },
            {
                'name': 'google',
                'value': 0
            },
        ];

        usuario = await querySingle('stp_usuarios_add', sqlParams);
        console.log('Usuario added');


        const token = await generateJWT(usuario.idUsuario);
        console.log('Token: \n' + token)

        res.json({
            status: true,
            message: 'Usuario añadido correctamente',
            data: { usuario, token }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'A ocurrido un error al añadir el usuario',
            data: err
        });
    }
}

/* Editar Usuario */
const updateUsuario = async(req, res = response) => {
    const idUsuario = req.params.id;
    const { nombre, email, password, imagen } = req.body;

    // Encryptar password
    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(password, salt);

    try {
        sqlParams = [{
                'name': 'idUsuario',
                'value': idUsuario
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': passwordEncrypted
            },
            {
                'name': 'imagen',
                'value': imagen
            }
        ];

        usuario = await querySingle('stp_usuarios_update', sqlParams);
        console.log(usuario);
        console.log('Usuario Edited');

        const token = await generateJWT(usuario.idUsuario);
        console.log('Token: \n' + token);

        res.json({
            status: true,
            message: 'Usuario actualizado correctamente',
            data: { usuario, token }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            message: 'A ocurrido un error al actualizar el usuario',
            data: err
        });
    }
}

/* Eliminar Usuario */
const deleteUsuario = async(req, res) => {
        const idUsuario = req.params.id;

        try {
            sqlParams = [{
                'name': 'idUsuario',
                'value': idUsuario
            }];

            usuario = await execute('stp_usuarios_delete', sqlParams);

            res.json({
                status: true,
                message: 'Usuario eliminado correctamente',
                data: null
            });
        } catch (err) {
            console.error('Error: ' + err);
            return res.json({
                status: false,
                message: 'Usuario no se pudo eliminar',
                data: err
            });
        }
    }
    //reset
const cambioPass = async(req, res) => {
    const { email, password } = req.body;
    const sqlParam = [{
        'name': 'email',
        'value': email
    }]
    let usuario = await querySingle('stp_usuarios_login', sqlParam)
    if (usuario) {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        const sqlParams = [{
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            }
        ]

        let rowsAffected = await execute('stp_usuarios_reset', sqlParams);
        if (rowsAffected != 0) {
            res.json({
                status: true,
                message: 'contraseña actualizada correctamente',
                data: 1
            });
        } else {
            res.json({
                status: false,
                message: 'A ocurrido un error al actualizar',
                data: 0
            });
        }
    } else {
        res.json({
            status: false,
            message: 'El usuario o contraseña es incorrecta',
            data: null
        })
    }

}


module.exports = {
    getUsuarios,
    getUsuarioId,
    getUsuarioEmail,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    cambioPass
}