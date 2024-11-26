//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙RUTAS ⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
const express = require("express");
const router = express.Router();
const cursoService = require("../services/cursoService");

// ■■■■■■■■ Obtener grados ■■■■■■■■
router.get('/grados', async (req, res) => {
    try {
        console.log("GET TODOS grados");
        const grados = await cursoService.getGrados();
        res.json(grados);
    } catch (error) {
        console.error('Error al obtener los grados: ', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// ■■■■■■■■ Obtener asignaturas por grado ■■■■■■■■
router.get('/asignaturas', async (req, res) => {
    const { idGrado } = req.query; // Se espera que el cliente envíe el ID del grado como parámetro.
    console.log("GET asignaturas para grado:", idGrado);
    try {
        if (!idGrado) {
            return res.status(400).json({ message: "El parámetro idGrado es obligatorio." });
        }

        const asignaturas = await cursoService.getAsignaturasPorGrado(idGrado);
        res.json(asignaturas);
    } catch (error) {
        console.error('Error al obtener las asignaturas: ', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


//⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙IMPRESCINDIBLE⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙⁙
module.exports = router;
