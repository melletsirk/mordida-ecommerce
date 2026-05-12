import { Router } from 'express';
import { getPedidosAsignados, getRepartidores } from '../controllers/repartidorController.js';

const router = Router();

router.get('/', getRepartidores);
router.get('/:id/pedidos', getPedidosAsignados);

export default router;
