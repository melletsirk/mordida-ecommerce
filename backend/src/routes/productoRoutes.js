import { Router } from 'express';
import { createProducto, getProductoById, getProductos } from '../controllers/productoController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProductoById);
router.post('/', requireAuth, requireRole('admin'), createProducto);

export default router;
