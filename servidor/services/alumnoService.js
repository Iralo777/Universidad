//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙ RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// ■■■■■■■■■■■ Obtener alumno desde id/nif/nombre ■■■■■■■■■■■

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