import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { signToken } from '../utils/jwt.js';

const publicUser = (user) => ({
  id: user.id,
  nombre: user.nombre,
  email: user.email,
  rol: user.rol,
  telefono: user.telefono
});

export const register = async (req, res, next) => {
  try {
    const { nombre, email, password, telefono = '', rol = 'cliente' } = req.body;
    if (!nombre || !email || !password) {
      const error = new Error('Nombre, email y password son requeridos');
      error.status = 400;
      throw error;
    }

    const exists = await query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (exists.rows.length) {
      const error = new Error('El email ya esta registrado');
      error.status = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO usuarios (nombre, email, password_hash, telefono, rol)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nombre, email, telefono, rol`,
      [nombre, email, passwordHash, telefono, rol]
    );

    const user = result.rows[0];
    res.status(201).json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error('Email y password son requeridos');
      error.status = 400;
      throw error;
    }

    const result = await query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    const valid = user ? await bcrypt.compare(password, user.password_hash) : false;

    if (!valid) {
      const error = new Error('Credenciales invalidas');
      error.status = 401;
      throw error;
    }

    res.json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
};
