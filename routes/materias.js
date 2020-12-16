const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { getMaterias, getMateria, addMateria, updateMateria, deleteMateria } = require('../bml/controllers/materias');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//GetAll
router.get('/', getMaterias);

//Getbyid
router.get('/:id', getMateria);

//Add
router.post('/', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'Las horas son requeridas').not().isEmpty(),
        check('horasP', 'Las horasP son requeridas').not().isEmpty(),
        check('horasT', 'Las horasT son requeridas').not().isEmpty(),
        check('creditos', 'Los credito  son requeridos').not().isEmpty(),
        validarCampos
    ],
    addMateria);

//Update
router.put('/:id', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'Las horas son requeridas').not().isEmpty(),
        check('horasP', 'Las horasP son requeridas').not().isEmpty(),
        check('horasT', 'Las horasT son requeridas').not().isEmpty(),
        check('creditos', 'Los credito  son requeridos').not().isEmpty(),
        validarCampos
    ],
    updateMateria);

//Delete
router.delete('/:id', deleteMateria);

module.exports = router;