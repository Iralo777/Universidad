//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const express = require("express");
const router = express.Router();
const gestionService = require("../services/gestionService");

//■■■■■■■ Cargar grados ■■■■■■■
router.get('/grados', async (req, res) => {
    try {
        const result = await gestionService.obtenerGrados();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener grados:', error.message);
        res.status(500).json({ message: 'Error al obtener grados.' });
    }
});


// Modificando la ruta para aceptar el id_grado
router.get('/asignaturas/:idGrado', async (req, res) => {
    try {
        const idGrado = req.params.idGrado;  // Aquí se pasa el id del grado
        const result = await gestionService.obtenerAsignaturasPorGrado(idGrado);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener asignaturas:', error.message);
        res.status(500).json({ message: 'Error al obtener asignaturas.' });
    }
});


//■■■■■■■ Cargar curso ■■■■■■■
router.get('/cursos', async (req, res) => {
    try {
        const result = await gestionService.obtenerCursos();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener cursos:', error.message);
        res.status(500).json({ message: 'Error al obtener cursos.' });
    }
});


//■■■■■■■■■■■ MatriculaR en alumno_se_matricula_asignatura ■■■■■■■■■■■
router.post('/matricular', async (req, res) => {
    console.log("//■■■■■■■■■■■ MatriculaR en alumno_se_matricula_asignatura ■■■■■■■■■■■");
    try {
        
        const matriculas = req.body.matriculas;
        if (!matriculas || !Array.isArray(matriculas)) {
            return res.status(400).json({ message: 'Formato inválido en las matriculas.' });
        }

        let totalMatriculadas = 0;
        for (let i = 0; i < matriculas.length; i++) {
            const matricula = matriculas[i]; 
            const result = await gestionService.crearMatricula(matricula); 
            totalMatriculadas += result.affectedRows;
        }

        res.status(201).json({ message: `${totalMatriculadas} asignaturas matriculadas.` });
    } catch (error) {
        console.error('Error al matricular:', error.message);
        res.status(500).json({ message: 'Error al realizar la matriculación.' });
    }
});


//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙IMPRESCINDIBLE⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
module.exports = router;