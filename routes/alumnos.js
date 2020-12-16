const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { getAlumnos, getAlumno, addAlumno, updateAlumno, deleteAlumno } = require('../bml/controllers/alumnos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//GetAll
router.get('/', getAlumnos);

//Getbyid
router.get('/:id', getAlumno);

//Add
router.post('/', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerida').not().isEmpty(),
        check('sexo', 'El sexo es requerido').not().isEmpty(),
        check('semestre', 'El semestre es requerido').not().isEmpty(),
        check('carrera', 'La carrera es requerida').not().isEmpty(),
        validarCampos
    ],
    addAlumno);

//Update
router.put('/:id', [

        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerida').not().isEmpty(),
        check('sexo', 'El sexo es requerido').not().isEmpty(),
        check('semestre', 'El semestre es requerido').not().isEmpty(),
        check('carrera', 'La carrera  es requerida').not().isEmpty(),
        validarCampos
    ],
    updateAlumno);

//Delete
router.delete('/:id', deleteAlumno);

module.exports = router;