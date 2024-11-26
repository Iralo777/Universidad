//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const db = require('./db');
const helper = require('../helper');
const config = require('../config');


// ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙ QUE TENGO QUE HACER ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
        // Cargar grados
        // Cargar asignaturas según grado
        // Cargar cursos
        // Matricular en alumno_se_matricula_asignatura

//■■■■■■■ Cargar grados ■■■■■■■
async function obtenerGrados() {
    console.log("■■■■■■■obtenerGrados■■■■■■■");

    const sql = "SELECT id, nombre FROM grado";
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return { data };
}

// ■■■■■■■■■■■ Cargar asignaturas según grado ■■■■■■■■■■■
async function obtenerAsignaturasPorGrado(nombreGrado) {
    console.log("■■■■■■■ getAsignaturasPorGrado ■■■■■■■");
    
    const sql = "SELECT a.id, a.nombre FROM asignatura a JOIN grado g ON a.id_grado = g.id WHERE g.id = ?";
    const rows = await db.query(sql, [nombreGrado]); // Usamos placeholder para evitar inyección SQL.
    
    const data = helper.emptyOrRows(rows);
    return { data };
}

//■■■■■■■ Cargar curso ■■■■■■■
async function obtenerCursos() {
    console.log("■■■■■■■obtenerCursos■■■■■■■");

    const sql = "SELECT id, CONCAT_ws('-',c.anyo_inicio, c.anyo_fin) AS curso FROM curso_escolar c";
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return { data };
}

// ■■■■■■■■■■■ MatriculaR en alumno_se_matricula_asignatura ■■■■■■■■■■■
/*COMO FUNCIONA
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);*/
//cada asignatura tendre que meterla por separado.. pero esto tendre que plantearlo luego, no?
async function crearMatricula(matricula) {
    console.log("■■■■■■■ crearMatricula ■■■■■■■");
    const sql = `INSERT INTO alumno_se_matricula_asignatura 
                 (id_alumno, id_asignatura, id_curso_escolar) 
                 VALUES (?, ?, ?)`;
    const result = await db.query(sql, [
        matricula.id_alumno,
        matricula.id_asignatura,
        matricula.id_curso_escolar
    ]);
    return { affectedRows: result.affectedRows };
}



//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙IMPRESCINDIBLES⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
module.exports = {
    obtenerGrados,
    obtenerAsignaturasPorGrado,
    obtenerCursos,
    crearMatricula
};