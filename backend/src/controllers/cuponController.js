import { query } from '../config/db.js';

export const getCupones = async (_req, res, next) => {
  try {
    const result = await query('SELECT * FROM cupones ORDER BY creado_en DESC');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const createCupon = async (req, res, next) => {
  try {
    const { codigo, descripcion, descuento_porcentaje, activo = true, vence_en = null } = req.body;
    const result = await query(
      `INSERT INTO cupones (codigo, descripcion, descuento_porcentaje, activo, vence_en)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [codigo, descripcion, descuento_porcentaje, activo, vence_en]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
