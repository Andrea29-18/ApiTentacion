import  express from 'express';
const router = express.Router();
import {
    crearInsumo,
    obtenerInsumos,
    obtenerInsumoPorId,
    actualizarInsumo,
    eliminarInsumo,
    calcularCosteo
} from '../controller/insumoControlador.js';

// Definir rutas
router.post('/', crearInsumo);
router.get('/', obtenerInsumos);
router.get('/:id', obtenerInsumoPorId);
router.put('/:id', actualizarInsumo);
router.delete('/:id', eliminarInsumo);

// Ruta para calcular el costeo de los insumos utilizados
router.post('/costeo', calcularCosteo);

export default router;