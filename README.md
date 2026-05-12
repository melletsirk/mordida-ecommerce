# Mordida E-commerce

Mordida es una app full stack para pedidos de comida rapida: clientes compran, administradores gestionan operaciones y repartidores actualizan entregas. Incluye frontend React + Vite, API REST con Express, PostgreSQL, JWT, pagos simulados, ruta simulada y estructura lista para integrar un chatbot con OpenAI API mas adelante.

## Estructura

```txt
mordida-ecommerce/
├── frontend/
├── backend/
├── database/
├── docs/
└── README.md
```

## Requisitos

- Node.js 20+
- PostgreSQL 14+
- npm

## Base de datos

```sql
CREATE DATABASE mordida_db;
```

Luego ejecuta los scripts:

```bash
psql -U postgres -d mordida_db -f database/schema.sql
psql -U postgres -d mordida_db -f database/seed.sql
```

## Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Edita `backend/.env` con tus credenciales de PostgreSQL. La API queda disponible en `http://localhost:4000`.

Usuarios seed:

- Cliente: `cliente@mordida.test` / `123456`
- Admin: `admin@mordida.test` / `123456`
- Repartidor: `repartidor@mordida.test` / `123456`

## Frontend

```bash
cd frontend
npm install
npm run dev
```

La app queda disponible normalmente en `http://localhost:5173`.

## Rutas API principales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/productos`
- `GET /api/productos/:id`
- `POST /api/pedidos`
- `GET /api/pedidos/:id`
- `PATCH /api/pedidos/:id/estado`
- `GET /api/usuarios`
- `GET|POST /api/cupones`
- `GET /api/repartidores`
- `POST /api/chatbot/cliente`
- `POST /api/chatbot/admin/ventas`

## Notas

- El pago es simulado y no procesa tarjetas reales.
- La ruta del repartidor es visual y simulada; no usa Google Maps.
- El chatbot devuelve respuestas mock desde el backend. La carpeta `backend/src/controllers/chatbotController.js` ya deja aislado el punto donde integrar OpenAI API.
