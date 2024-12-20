/**
 * Service Alumnos
 * @namespace alumnoService
 */
//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙ RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// ■■■■■■■■■■■ Obtener alumno desde id/nif/nombre ■■■■■■■■■■■
/**
 * Obtiene un alumno basado en su ID, NIF o nombre.
 * 
 * @async
 * @function alumnoIdNif
 * @memberof alumnoService
 * @param {string|number} idNif - El ID o NIF del alumno para buscar.
 * @param {string} [nombre] - El nombre del alumno para búsqueda parcial. Es opcional.
 * @returns {Promise<Object>} Un objeto con los datos del alumno o un array vacío si no se encuentra.
 */
async function alumnoIdNif(idNif, nombre){
    console.log("■■■■■■■alumnoIdNif■■■■■■■");

    let sql="SELECT id, nif, nombre, apellido1, apellido2, ciudad, sexo FROM alumno WHERE 1 ";
    
    console.log("que es "+ typeof idNif);

    if(esDNIValido(idNif) && idNif !==undefined){
        sql+=" AND nif='"+idNif+"'";
    }else if(idNif !==undefined){
        sql+=" AND id="+ idNif;
    };
    


    // Si se pasa un nombre, lo agregamos para búsqueda parcial
    if (nombre !== undefined) {
        sql += " AND nombre LIKE '%"+nombre+"%'";
    }


        console.log(sql);
        const rows = await db.query(sql);
        const data = helper.emptyOrRows(rows);
  
        return {data}; 

  }

// ■■■■■■■■■■■ Verificar nif ■■■■■■■■■■■ para descartar si es nif o id
/**
 * Verifica si un NIF es válido (formato de 8 dígitos seguidos de una letra).
 * 
 * @function esDNIValido
 * @memberof alumnoService
 * @param {string} dni - El NIF que se quiere verificar.
 * @returns {boolean} `true` si el NIF es válido, `false` si no lo es.
 */
  function esDNIValido(dni) { //dni es un nombre random que se le pone

    const regex = /^[0-9]{8}[A-Za-z]$/; 
    //⬇⬇⬇ regex (nombre obligatorio asi) 
    //regex es como una condicion exacta que buscas, a la cual le indicas que le entra de numeros, cantidad de digitos y de letras
    if (!regex.test(dni)) { //.test es algo que funciona con regex y verifica que se cumplan los requisitos que se le pusieron arriba
        return false; 
    }
    return true ;
}
//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙IMPRESCINDIBLES⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
module.exports = {
    alumnoIdNif
  }