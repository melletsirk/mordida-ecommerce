import { query } from '../config/db.js';

export const getUsuarios = async (_req, res, next) => {
  try {
    const result = await query(
      'SELECT id, nombre, email, telefono, rol, creado_en FROM usuarios ORDER BY creado_en DESC'
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
