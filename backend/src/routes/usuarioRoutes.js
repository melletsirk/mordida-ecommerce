import { Router } from 'express';
import { getUsuarios } from '../controllers/usuarioController.js';

const router = Router();

router.get('/', getUsuarios);

export default router;
