import { Router } from 'express';
import { createPedido, getPedidoById, getPedidos, updatePedidoEstado } from '../controllers/pedidoController.js';

const router = Router();

router.get('/', getPedidos);
router.post('/', createPedido);
router.get('/:id', getPedidoById);
router.patch('/:id/estado', updatePedidoEstado);

export default router;
