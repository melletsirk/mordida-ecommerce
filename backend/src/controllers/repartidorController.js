import { query } from '../config/db.js';

export const getRepartidores = async (_req, res, next) => {
  try {
    const result = await query('SELECT * FROM repartidores ORDER BY nombre');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getPedidosAsignados = async (req, res, next) => {
  try {
    const result = await query(
      `SELECT p.*, r.nombre AS repartidor
       FROM pedidos p JOIN repartidores r ON r.id = p.repartidor_id
       WHERE r.id = $1
       ORDER BY p.creado_en DESC`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
