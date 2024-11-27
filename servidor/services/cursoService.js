//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙ RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const db = require('./db');
const helper = require('../helper');
const config = require('../config');


// ■■■■■■■■■■■ Obtener grados ■■■■■■■■■■■
/**
 * Obtiene todos los grados disponibles.
 * 
 * @async
 * @function getGrados
 * @returns {Promise<Object>} Un objeto que contiene un array con los grados obtenidos.
 */
async function getGrados() {
    console.log("■■■■■■■ getGrados ■■■■■■■");
    const sql = "SELECT id, nombre FROM grado";
    const rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);

    return { data };
}

// ■■■■■■■■■■■ Obtener asignaturas por grado ■■■■■■■■■■■
/**
 * Obtiene las asignaturas de un grado específico.
 * 
 * @async
 * @function getAsignaturasPorGrado
 * @param {string} nombreGrado - El nombre del grado para el cual se desean obtener las asignaturas.
 * @returns {Promise<Object>} Un objeto que contiene un array con las asignaturas del grado especificado.
 */
async function getAsignaturasPorGrado(nombreGrado) {
    console.log("■■■■■■■ getAsignaturasPorGrado ■■■■■■■");
    const sql = "SELECT a.id, a.nombre, a.creditos, a.curso, a.cuatrimestre, p.nombre AS profesor FROM asignatura a LEFT JOIN profesor p ON a.id_profesor = p.id JOIN grado g ON a.id_grado=g.id WHERE g.nombre= ?";//el poner una ? se llama placeholder, se hace para evitar que otros metan codigo en el sql de la bbdd
    const rows = await db.query(sql, [nombreGrado]); // evita inyección codigo
    const data = helper.emptyOrRows(rows);

    return { data };
}

//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙IMPRESCINDIBLES⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
module.exports = {
    getGrados,
    getAsignaturasPorGrado
};
