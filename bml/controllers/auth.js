const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const { querySingle } = require('../../dal/data-access');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;
    const sqlParams = [{
        name: "email",
        value: email
    }, ];

    usuario = await querySingle('stp_usuarios_login', sqlParams);

    if (!usuario) {
        res.status(400).json({
            status: false,
            message: 'Email no encontrado',
            data: null,
        });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.status(400).json({
            status: false,
            message: 'Contraseña incorrecta',
            data: null,
        });
    }

    const token = await generateJWT(usuario.idUsuario);

    res.json({
        status: true,
        message: 'Acceso correcto',
        data: token,
    });
}

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        sqlParams = [{
            'name': 'email',
            'value': email
        }];
        usuario = await querySingle('stp_usuarios_login', sqlParams);
        console.log(usuario);
        //verificar si existe en bd
        if (!usuario) {
            //crear usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'local',
                    'value': 0
                },
                {
                    'name': 'imagen',
                    'value': picture
                }
            ];
            usuario = await querySingle('stp_usuarios_add', sqlParams);

        } else {
            sqlParams = [{
                    'name': 'idUsuario',
                    'value': usuario.idUsuario
                },
                {
                    'name': 'nombre',
                    'value': usuario.nombre
                },
                {
                    'name': 'email',
                    'value': usuario.email
                },
                {
                    'name': 'password',
                    'value': usuario.password
                },
                {
                    'name': 'imagen',
                    'value': usuario.imagen
                },
            ];
            usuario = await querySingle('stp_usuarios_update', sqlParams);
        }
        console.log(usuario.idUsuario);
        const token = await generateJWT(usuario.idUsuario);

        res.json({
            status: true,
            message: 'Acceso correcto',
            data: token
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'El token de google no es correcto',
            data: err
        });
    }
}

const loginToken = async(req, res = response) => {
    const { email, token } = req.body;
    const sqlParams = [{
        name: "email",
        value: email
    }, ];
    const usuario = await querySingle("stp_usuarios_login", sqlParams);
    const tokenNew = await generateJWT(usuario.idUsuario);
    res.json({
        status: true,
        message: 'Acceso correcto',
        data: tokenNew,
    });
};

module.exports = {
    login,
    googleSignIn,
    loginToken,
};