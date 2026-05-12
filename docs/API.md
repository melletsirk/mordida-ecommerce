# API Mordida

Base URL local: `http://localhost:4000/api`.

## Autenticacion

Las rutas protegidas esperan `Authorization: Bearer <token>`.

## Chatbot

`POST /chatbot/cliente` y `POST /chatbot/admin/ventas` devuelven respuestas mock. La integracion real con OpenAI API debe agregarse en `backend/src/controllers/chatbotController.js`, manteniendo las mismas rutas para no romper el frontend.
