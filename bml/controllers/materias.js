const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener materias
const getMaterias = async(req, res) => {
    let materias = await query('stp_materias_getall');
    if (materias) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: materias
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al consultar las materias',
            data: null
        });
    }
}

//Obtener materia
const getMateria = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let materia = await querySingle('stp_materias_getbyid', sqlParams);
    if (materia) {
        res.json({
            status: true,
            message: 'Consulta de materias exitosa',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al consultar las materias',
            data: null
        });
    }
}

//Agregar materia
const addMateria = async(req, res) => {
    const { nombre, horas, creditos } = req.body;
    const horasP = horas * 4;
    const horasT = horasP * 3;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasp',
            'value': horasP
        },
        {
            'name': 'horast',
            'value': horasT
        },
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    let rowsAffected = await execute('stp_materias_add', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia añadida correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al añadir la materia',
            data: 0
        });
    }
}

//Actualizar materia
const updateMateria = async(req, res) => {
    const { id } = req.params;
    const { nombre, horas, creditos } = req.body;
    const horasP = horas * 4;
    const horasT = horasP * 3;
    const sqlParams = [{
            'name': 'idMateria',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasp',
            'value': horasP
        },
        {
            'name': 'horast',
            'value': horasT
        }, ,
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    let rowsAffected = await execute('stp_materias_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia actualizada correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al actualizar la materia',
            data: 0
        });
    }
}

//Borrar materia
const deleteMateria = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let rowsAffected = await execute('stp_materias_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia eliminada correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al eliminar la materia',
            data: 0
        });
    }
}

module.exports = {
    getMaterias,
    getMateria,
    addMateria,
    updateMateria,
    deleteMateria
}