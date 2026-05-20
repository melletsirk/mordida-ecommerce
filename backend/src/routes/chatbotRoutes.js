import { Router } from 'express';
import { askChatbot } from '../controllers/chatbotController.js';

const router = Router();

// Endpoint unificado para el chatbot con Text-to-SQL
router.post('/', askChatbot);

export default router;
