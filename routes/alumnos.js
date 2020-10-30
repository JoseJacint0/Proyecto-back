//ruta api/alumnos

const Router = require('express');
const conString = require('../database/config');
const sql = require('mssql');

const router = Router();

//getall GET
router.get('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .execute('stp_alumnos_getall');
    }).then(result => {
        res.json(result.recordset);
    }).catch(err => {
        res.json(err);
    });
});

//getbyid GET
router.get('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idAlumno', req.params.id)
            .execute('stp_alumnos_getbyid');
    }).then(result => {
        res.json(result.recordset[0]);
    }).catch(err => {
        res.json(err);
    });

});

//add POST
router.post('/', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('nombre', req.body.nombre)
            .input('edad', req.body.edad)
            .input('sexo', req.body.sexo)
            .input('semestre', req.body.semestre)
            .input('carrera', req.body.carrera)
            .execute('stp_alumnos_add');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Alumno agregado correctamente"
        })
    }).catch(err => {
        res.json(err);
    });

});

//update PUT
router.put('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idAlumno', req.params.id)
            .input('nombre', req.body.nombre)
            .input('edad', req.body.edad)
            .input('sexo', req.body.sexo)
            .input('semestre', req.body.semestre)
            .input('carrera', req.body.carrera)
            .execute('stp_alumnos_update');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Alumno actualizado correctamente"
        })
    }).catch(err => {
        res.json(err);
    });

});

//delete DELETE
router.delete('/:id', (req, res) => {
    sql.on('error', err => {
        console.log(err);
        res.json(err);
    });
    sql.connect(conString).then(pool => {
        return pool.request()
            .input('idAlumno', req.params.id)
            .execute('stp_alumnos_delete');
    }).then(result => {
        res.status(201).json({
            status: "ok",
            msg: "Alumno eliminado correctamente"
        })
    }).catch(err => {
        res.json(err);
    });

});

module.exports = router;