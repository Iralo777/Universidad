//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const express = require("express");
const router = express.Router();
const alumnoService = require("../services/alumnoService");


// ■■■■■■■■ Buscar Alumno por ID, NIF  o nombre■■■■■■■■
router.get("/buscar", async function (req, res) {
    console.log("Búsqueda de alumno por IDNIF/nombre");
    const { idNif, nombre } = req.query; // Obtener parámetros de la query
   
    try {
        //⬇️⬇️⬇️⬇️⬇️ ya no uso esto puesto que le estoy bloqueando en el scriptAlumnos directamente ⬇️⬇️⬇️⬇️⬇️
        // if ((idNif && nombre)) {
        //     return res.status(400).json({ msg: "Solo se puede elegir uno de los campos: ID-NIF o nombre." });
        // }
        const result = await alumnoService.alumnoIdNif(idNif, nombre);
        if (result.data.length > 0) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({ msg: "No se encontró ningún alumno con los criterios especificados." });
        }
    } catch (err) {
        console.error("Error con la búsqueda de alumno: ", err.message);
        res.status(500).json({ error: err.message || "Error interno al realizar la búsqueda." });
    }
});


//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙IMPRESCINDIBLE⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
module.exports = router;