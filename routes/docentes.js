const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { getDocentes, getDocente, addDocente, updateDocente, deleteDocente } = require('../bml/controllers/docentes');
const { validarJWT } = require('../bml/middlewares/validar-jwt');


const router = Router();

//GetAll
router.get('/', getDocentes);

//Getbyid
router.get('/:id', getDocente);

//Add
router.post('/', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerida').not().isEmpty(),
        check('titulo', 'El titulo es requerido').not().isEmpty(),
        check('tipo', 'El tipo es requerido').not().isEmpty(),
        validarCampos
    ],
    addDocente);

//Update
router.put('/:id', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerida').not().isEmpty(),
        check('titulo', 'El titulo es requerido').not().isEmpty(),
        check('tipo', 'El tipo es requerido').not().isEmpty(),
        validarCampos
    ],
    updateDocente);

//Delete
router.delete('/:id', deleteDocente);

module.exports = router;