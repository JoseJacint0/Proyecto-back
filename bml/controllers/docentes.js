const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener docentes
const getDocentes = async(req, res) => {
    let docentes = await query('stp_docentes_getall');
    if (docentes) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docentes
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al consultar los docentes',
            data: null
        });
    }
}

//Obtener docente GETALL
const getDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let docente = await querySingle('stp_docentes_getbyid', sqlParams);
    if (docente) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al consultar los docentes',
            data: null
        });
    }
}

//Agregar docente
const addDocente = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let rowsAffected = await execute('stp_docentes_add', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente añadido correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al añadir el docente',
            data: 1
        });
    }
}

//Actualizar docente
const updateDocente = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'idDocente',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let rowsAffected = await execute('stp_docentes_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente actualizado correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al actualizar el docente',
            data: 0
        });
    }
}

//Borrar docente
const deleteDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let rowsAffected = await execute('stp_docentes_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente eliminado correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'A ocurrido un error al eliminar el docente',
            dato: 0
        });
    }
}

module.exports = {
    getDocentes,
    getDocente,
    addDocente,
    updateDocente,
    deleteDocente
}