//Ruta: api/login

const { Router } = require('express');
const { login, googleSignIn, loginToken } = require('../bml/controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require("../bml/middlewares/validar-jwt");

const router = Router();

//login
router.post('/', [
        check('email', 'El mail es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google', [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)

router.post('/renew', [
        check("email", "El email es obligatorio").not().isEmpty(),
        check("token", "El token es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    loginToken
);

module.exports = router;