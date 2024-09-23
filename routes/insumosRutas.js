const express = require('express');
const router = express.Router();
const {
    crearInsumo,
    obtenerInsumos,
    obtenerInsumoPorId,
    actualizarInsumo,
    eliminarInsumo,
    calcularCosteo
} = require('../controller/insumoControlador');

// Definir rutas
router.post('/', crearInsumo);
router.get('/', obtenerInsumos);
router.get('/:id', obtenerInsumoPorId);
router.put('/:id', actualizarInsumo);
router.delete('/:id', eliminarInsumo);

// Ruta para calcular el costeo de los insumos utilizados
router.post('/costeo', calcularCosteo);

module.exports = router;