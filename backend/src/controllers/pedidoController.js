import { query, pool } from '../config/db.js';

export const getPedidos = async (_req, res, next) => {
  try {
    const result = await query(
      `SELECT p.*, u.nombre AS cliente, r.nombre AS repartidor
       FROM pedidos p
       JOIN usuarios u ON u.id = p.usuario_id
       LEFT JOIN repartidores r ON r.id = p.repartidor_id
       ORDER BY p.creado_en DESC`
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getPedidoById = async (req, res, next) => {
  try {
    const pedido = await query('SELECT * FROM pedidos WHERE id = $1', [req.params.id]);
    if (!pedido.rows.length) {
      const error = new Error('Pedido no encontrado');
      error.status = 404;
      throw error;
    }
    const detalle = await query(
      `SELECT d.*, p.nombre, p.imagen_url
       FROM pedido_detalle d JOIN productos p ON p.id = d.producto_id
       WHERE d.pedido_id = $1`,
      [req.params.id]
    );
    res.json({ ...pedido.rows[0], detalle: detalle.rows });
  } catch (error) {
    next(error);
  }
};

export const createPedido = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { usuario_id, direccion, metodo_pago = 'simulado', items, cupon_codigo = null } = req.body;
    if (!usuario_id || !direccion || !items?.length) {
      const error = new Error('usuario_id, direccion e items son requeridos');
      error.status = 400;
      throw error;
    }

    await client.query('BEGIN');
    const ids = items.map((item) => item.producto_id);
    const productos = await client.query('SELECT id, precio FROM productos WHERE id = ANY($1::int[])', [ids]);
    const priceById = new Map(productos.rows.map((product) => [product.id, Number(product.precio)]));
    const subtotal = items.reduce((sum, item) => sum + priceById.get(item.producto_id) * item.cantidad, 0);
    const total = Number(subtotal.toFixed(2));

    const pedido = await client.query(
      `INSERT INTO pedidos (usuario_id, direccion_entrega, metodo_pago, cupon_codigo, subtotal, total, estado)
       VALUES ($1, $2, $3, $4, $5, $6, 'PENDIENTE')
       RETURNING *`,
      [usuario_id, direccion, metodo_pago, cupon_codigo, subtotal, total]
    );

    for (const item of items) {
      await client.query(
        `INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)`,
        [pedido.rows[0].id, item.producto_id, item.cantidad, priceById.get(item.producto_id)]
      );
    }

    await client.query('COMMIT');
    res.status(201).json(pedido.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

export const updatePedidoEstado = async (req, res, next) => {
  try {
    const { estado, repartidor_id = null } = req.body;
    const valid = ['PENDIENTE', 'CONFIRMADO', 'EN_PREPARACION', 'LISTO_PARA_ENVIO', 'EN_CAMINO', 'ENTREGADO', 'CANCELADO'];
    if (!valid.includes(estado)) {
      const error = new Error('Estado de pedido invalido');
      error.status = 400;
      throw error;
    }

    const result = await query(
      `UPDATE pedidos
       SET estado = $1, repartidor_id = COALESCE($2, repartidor_id), actualizado_en = NOW()
       WHERE id = $3
       RETURNING *`,
      [estado, repartidor_id, req.params.id]
    );
    if (!result.rows.length) {
      const error = new Error('Pedido no encontrado');
      error.status = 404;
      throw error;
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
