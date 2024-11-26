//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙ RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// ■■■■■■■■■■■ filterProfesor ■■■■■■■■■■■
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
// ■■■■■■■■ getProfesores ■■■■■■■■  Obtener una lista de todos los clientes
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
