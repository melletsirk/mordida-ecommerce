DROP TABLE IF EXISTS calificaciones, asignaciones_delivery, pedido_detalle, pedidos, cupones, repartidores, productos, categorias, usuarios CASCADE;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  telefono VARCHAR(30),
  rol VARCHAR(20) NOT NULL CHECK (rol IN ('cliente', 'admin', 'repartidor')),
  direccion TEXT,
  creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  slug VARCHAR(80) UNIQUE NOT NULL
);

CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id),
  nombre VARCHAR(140) NOT NULL,
  descripcion TEXT NOT NULL,
  precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
  imagen_url TEXT,
  disponible BOOLEAN DEFAULT TRUE,
  destacado BOOLEAN DEFAULT FALSE,
  creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE repartidores (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER UNIQUE REFERENCES usuarios(id),
  nombre VARCHAR(120) NOT NULL,
  telefono VARCHAR(30),
  estado VARCHAR(30) DEFAULT 'disponible',
  zona VARCHAR(80)
);

CREATE TABLE cupones (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(40) UNIQUE NOT NULL,
  descripcion TEXT NOT NULL,
  descuento_porcentaje NUMERIC(5,2) NOT NULL CHECK (descuento_porcentaje >= 0),
  activo BOOLEAN DEFAULT TRUE,
  vence_en DATE,
  creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  repartidor_id INTEGER REFERENCES repartidores(id),
  direccion_entrega TEXT NOT NULL,
  metodo_pago VARCHAR(40) NOT NULL DEFAULT 'simulado',
  cupon_codigo VARCHAR(40),
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  estado VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE' CHECK (estado IN (
    'PENDIENTE',
    'CONFIRMADO',
    'EN_PREPARACION',
    'LISTO_PARA_ENVIO',
    'EN_CAMINO',
    'ENTREGADO',
    'CANCELADO'
  )),
  creado_en TIMESTAMP DEFAULT NOW(),
  actualizado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedido_detalle (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id INTEGER NOT NULL REFERENCES productos(id),
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(10,2) NOT NULL
);

CREATE TABLE asignaciones_delivery (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  repartidor_id INTEGER NOT NULL REFERENCES repartidores(id),
  estado VARCHAR(30) DEFAULT 'asignado',
  asignado_en TIMESTAMP DEFAULT NOW(),
  recogido_en TIMESTAMP,
  entregado_en TIMESTAMP
);

CREATE TABLE calificaciones (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  puntuacion INTEGER NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
  comentario TEXT,
  creado_en TIMESTAMP DEFAULT NOW()
);
