//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const express = require("express");
const router = express.Router();
const profesorService = require("../services/profesorService");

// ■■■■■■■■ filterProfesor ■■■■■■■■
// Filtro de búsqueda compuesto por los campos: Nombre, apellido1, sexo y departamento
router.get("/filtro", async function (req, res) {
    console.log("filterProfesor");
    const { nombre, apellido1, sexo, departamento } = req.query; // Obtener parámetros de la query

    try {
        const result = await profesorService.filterProfesor(nombre, apellido1, sexo, departamento);

        if (result.data.length > 0) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({ msg: "No se encontraron profesores con los criterios especificados" });
        }
    } catch (err) {
        console.error("error con el filtro de profesores ", err.message);
        res.status(500).json({ error: "Error interno al filtrar por profesor" });
    }
});

// ■■■■■■■1- Obtener una lista de todos los comerciales, 
router.get("/",async function (req, res) {
  console.log("GET TODOS");
  try {
      const profesores= await profesorService.getProfesores();
      res.status(200).json(profesores);
  } catch (err){
  console.error("Error intentando extraer los datos de profesores ", err.message);
  res.status(500).json({ error: "Error interno al obtener los profesores" });
}
});

// ■■■■■■■■ getDepartamentos ■■■■■■■■ Ruta para obtener los departamentos
router.get('/departamento', async (req, res) => {
  console.log("GET TODOS departamentos");  
  try {
      const departamentos = await profesorService.getDepartamentos();
      res.json(departamentos);
    } catch (error) {
      console.error('Error al obtener los departamentos: ', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });





//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙IMPRESCINDIBLE⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
module.exports = router;