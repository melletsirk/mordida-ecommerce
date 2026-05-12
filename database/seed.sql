INSERT INTO usuarios (nombre, email, password_hash, telefono, rol, direccion) VALUES
('Cliente Mordida', 'cliente@mordida.test', '$2a$10$lL73GadBVhDHcqtgqO754exIgZLQwKFRA2MQrlc3904kBRfVnYG5i', '999111222', 'cliente', 'Av. Primavera 245'),
('Admin Mordida', 'admin@mordida.test', '$2a$10$lL73GadBVhDHcqtgqO754exIgZLQwKFRA2MQrlc3904kBRfVnYG5i', '999333444', 'admin', 'Central Mordida'),
('Rayo Rider', 'repartidor@mordida.test', '$2a$10$lL73GadBVhDHcqtgqO754exIgZLQwKFRA2MQrlc3904kBRfVnYG5i', '999555666', 'repartidor', 'Zona Norte');

INSERT INTO categorias (nombre, slug) VALUES
('Hamburguesas', 'hamburguesas'),
('Combos', 'combos'),
('Bebidas', 'bebidas'),
('Extras', 'extras');

INSERT INTO productos (categoria_id, nombre, descripcion, precio, imagen_url, destacado) VALUES
(1, 'Doble Mordida', 'Doble smash burger, cheddar fundido, pepinillos y salsa mordida.', 24.90, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80', TRUE),
(1, 'Lechuga Crunch', 'Carne jugosa, aros crocantes, tomate, lechuga y mayo mostaza.', 21.90, 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80', TRUE),
(1, 'Fuego BBQ', 'Hamburguesa con tocino, cebolla grillada y BBQ ahumada.', 23.50, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80', FALSE),
(2, 'Combo Mordida Max', 'Doble Mordida, papas rusticas y bebida helada.', 32.90, 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=900&q=80', TRUE),
(2, 'Combo Pareja', 'Dos hamburguesas clasicas, dos bebidas y papas para compartir.', 49.90, 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?auto=format&fit=crop&w=900&q=80', FALSE),
(3, 'Limonada Verde', 'Limonada fresca con hierbabuena y hielo.', 8.90, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80', FALSE),
(3, 'Soda Artesanal', 'Burbujeante, fria y perfecta para cortar el picante.', 7.50, 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=900&q=80', FALSE),
(4, 'Papas Mordida', 'Papas doradas con paprika, queso y salsa secreta.', 12.90, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80', TRUE),
(4, 'Aros de Cebolla', 'Crujientes, dorados y con dip mostaza.', 10.90, 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=900&q=80', FALSE);

INSERT INTO repartidores (usuario_id, nombre, telefono, estado, zona) VALUES
(3, 'Rayo Rider', '999555666', 'disponible', 'Miraflores - San Isidro');

INSERT INTO cupones (codigo, descripcion, descuento_porcentaje, activo, vence_en) VALUES
('MORDIDA10', '10% de descuento en tu primer pedido', 10, TRUE, '2026-12-31'),
('COMBO15', '15% en combos seleccionados', 15, TRUE, '2026-09-30'),
('FREEDRINK', 'Bebida de cortesia en pedidos grandes', 5, FALSE, '2026-06-30');

INSERT INTO pedidos (usuario_id, repartidor_id, direccion_entrega, metodo_pago, cupon_codigo, subtotal, total, estado) VALUES
(1, 1, 'Av. Primavera 245', 'simulado', 'MORDIDA10', 37.80, 34.02, 'EN_CAMINO'),
(1, NULL, 'Av. Primavera 245', 'simulado', NULL, 24.90, 24.90, 'PENDIENTE');

INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad, precio_unitario) VALUES
(1, 1, 1, 24.90),
(1, 8, 1, 12.90),
(2, 1, 1, 24.90);

INSERT INTO asignaciones_delivery (pedido_id, repartidor_id, estado) VALUES
(1, 1, 'en_camino');

INSERT INTO calificaciones (pedido_id, usuario_id, puntuacion, comentario) VALUES
(1, 1, 5, 'La hamburguesa llego caliente y las papas estuvieron perfectas.');
