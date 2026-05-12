import { query } from '../config/db.js';

export const getProductos = async (req, res, next) => {
  try {
    const result = await query(
      `SELECT p.*, c.nombre AS categoria
       FROM productos p
       JOIN categorias c ON c.id = p.categoria_id
       WHERE ($1::text IS NULL OR c.slug = $1)
       ORDER BY c.nombre, p.nombre`,
      [req.query.categoria || null]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const getProductoById = async (req, res, next) => {
  try {
    const result = await query(
      `SELECT p.*, c.nombre AS categoria
       FROM productos p JOIN categorias c ON c.id = p.categoria_id
       WHERE p.id = $1`,
      [req.params.id]
    );
    if (!result.rows.length) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      throw error;
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const createProducto = async (req, res, next) => {
  try {
    const { categoria_id, nombre, descripcion, precio, imagen_url, disponible = true } = req.body;
    const result = await query(
      `INSERT INTO productos (categoria_id, nombre, descripcion, precio, imagen_url, disponible)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [categoria_id, nombre, descripcion, precio, imagen_url, disponible]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
