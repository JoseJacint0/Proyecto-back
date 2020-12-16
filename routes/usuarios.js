//Ruta api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, addUsuario, updateUsuario, deleteUsuario, getUsuarioId, cambioPass } = require('../bml/controllers/usuarios');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//getall
router.get('/',
    getUsuarios);

//getbyid
router.get('/:id',

    getUsuarioId);

//add
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
    addUsuario
);
//update
router.put('/:id', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos,
    ],
    updateUsuario
);
//delete
router.delete('/:id',
    deleteUsuario);

//reset
router.post('/cambiopass', [
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    cambioPass);

module.exports = router;