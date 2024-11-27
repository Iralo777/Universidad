//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙ RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// ■■■■■■■■■■■ filterProfesor ■■■■■■■■■■■
/**
 * Filtra los profesores según los parámetros proporcionados (nombre, apellido1, sexo, departamento).
 * @async
 * @function filterProfesor
 * @param {string} [nombre] - El nombre del profesor a buscar. (opcional)
 * @param {string} [apellido1] - El primer apellido del profesor a buscar. (opcional)
 * @param {string} [sexo] - El sexo del profesor a buscar. Debe ser "H" para hombre o "M" para mujer. (opcional)
 * @param {string} [departamento] - El nombre del departamento al que pertenece el profesor. (opcional)
 * @returns {Promise<Object>} Retorna un objeto con los datos de los profesores filtrados.
 * @example
 * // Ejemplo de uso de la función:
 * const resultado = await filterProfesor('Juan', 'Pérez', 'H', 'Matemáticas');
 * console.log(resultado);
 */
async function filterProfesor(nombre, apellido1, sexo, departamento){
    console.log("■■■■■■■filterProfesor■■■■■■■");
    let sql="SELECT p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.nombre AS departamento FROM profesor p JOIN departamento d ON p.id_departamento=d.id WHERE 1";

        if (nombre!=undefined) {
            sql += " AND p.nombre LIKE '%"+nombre+"%'";
        }

        if (apellido1!=undefined) {
            sql += " AND p.apellido1 LIKE '%"+apellido1+"%'";
        }
        if (sexo=="H" || sexo=="M") {
            sql += " AND p.sexo='"+sexo+"'";
        }

        if (departamento!=undefined) {
            sql += " AND d.nombre LIKE '%"+departamento+"%'";
        }
        console.log(sql);
        const rows = await db.query(sql);
        const data = helper.emptyOrRows(rows);
  
        return {data}; 

  }
// ■■■■■■■■ getProfesores ■■■■■■■■  Obtener una lista de todos los profesores
/**
 * Obtiene la lista completa de profesores.
 * @async
 * @function getProfesores
 * @param {number} [page=1] - El número de página para la paginación (opcional).
 * @returns {Promise<Object>} Retorna un objeto con los datos de los profesores y la información de la página.
 * @example
 * // Ejemplo de uso de la función:
 * const resultado = await getProfesores(1);
 * console.log(resultado);
 */
async function getProfesores(page = 1){
    const rows = await db.query(`SELECT p.nif, p.nombre, p.apellido1, p.apellido2, p.ciudad, p.sexo, d.nombre AS departamento FROM profesor p JOIN departamento d ON p.id_departamento=d.id`);
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    };
}

  //■■■■■■■■■■■ getDepartamentos ■■■■■■■■■■■
  /**
 * Obtiene la lista completa de departamentos.
 * @async
 * @function getDepartamentos
 * @param {number} [page=1] - El número de página para la paginación (opcional).
 * @returns {Promise<Object>} Retorna un objeto con los datos de los departamentos y la información de la página.
 * @example
 * // Ejemplo de uso de la función:
 * const resultado = await getDepartamentos(1);
 * console.log(resultado);
 */
  async function getDepartamentos(page = 1){
    
    const rows = await db.query(`SELECT nombre FROM departamento`);
    
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
  }

//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙IMPRESCINDIBLES⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙ 
module.exports = {
    filterProfesor,
    getDepartamentos,
    getProfesores
}
