import { Router } from 'express';
import { createCupon, getCupones } from '../controllers/cuponController.js';

const router = Router();

router.get('/', getCupones);
router.post('/', createCupon);

export default router;
