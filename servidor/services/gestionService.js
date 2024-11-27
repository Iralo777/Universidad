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
/**
 * Obtiene todos los grados disponibles en la base de datos.
 * 
 * @async
 * @function obtenerGrados
 * @returns {Promise<Object>} Un objeto que contiene un array con los grados obtenidos.
 */
async function obtenerGrados() {
    console.log("■■■■■■■obtenerGrados■■■■■■■");

    const sql = "SELECT id, nombre FROM grado";
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return { data };
}

// ■■■■■■■■■■■ Cargar asignaturas según grado ■■■■■■■■■■■
/**
 * Obtiene las asignaturas de un grado específico.
 * 
 * @async
 * @function obtenerAsignaturasPorGrado
 * @param {string} nombreGrado - El nombre del grado para el cual se desean obtener las asignaturas.
 * @returns {Promise<Object>} Un objeto que contiene un array con las asignaturas del grado especificado.
 */
async function obtenerAsignaturasPorGrado(nombreGrado) {
    console.log("■■■■■■■ getAsignaturasPorGrado ■■■■■■■");
    
    const sql = "SELECT a.id, a.nombre FROM asignatura a JOIN grado g ON a.id_grado = g.id WHERE g.id = ?";
    const rows = await db.query(sql, [nombreGrado]); // Usamos placeholder para evitar inyección SQL.
    
    const data = helper.emptyOrRows(rows);
    return { data };
}

//■■■■■■■ Cargar curso ■■■■■■■
/**
 * Obtiene todos los cursos escolares disponibles en la base de datos.
 * 
 * @async
 * @function obtenerCursos
 * @returns {Promise<Object>} Un objeto que contiene un array con los cursos escolares obtenidos.
 */
async function obtenerCursos() {
    console.log("■■■■■■■obtenerCursos■■■■■■■");

    const sql = "SELECT id, CONCAT_ws('-',c.anyo_inicio, c.anyo_fin) AS curso FROM curso_escolar c";
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return { data };
}

// ■■■■■■■■■■■ MatriculaR en alumno_se_matricula_asignatura ■■■■■■■■■■■
/**
 * Crea una matrícula de un alumno en una asignatura y curso específicos.
 * 
 * @async
 * @function crearMatricula
 * @param {Object} matricula - Un objeto que contiene los datos de la matrícula.
 * @param {number} matricula.id_alumno - El ID del alumno.
 * @param {number} matricula.id_asignatura - El ID de la asignatura en la que se matricula el alumno.
 * @param {number} matricula.id_curso_escolar - El ID del curso escolar en el que se matricula el alumno.
 * @returns {Promise<Object>} Un objeto con la cantidad de filas afectadas en la base de datos.
 */
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