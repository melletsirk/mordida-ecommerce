import { Router } from 'express';
import { adminVentasChat, clienteChat } from '../controllers/chatbotController.js';

const router = Router();

router.post('/cliente', clienteChat);
router.post('/admin/ventas', adminVentasChat);

export default router;
