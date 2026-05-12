import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const requireAuth = (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    const error = new Error('Token de autorizacion requerido');
    error.status = 401;
    return next(error);
  }

  try {
    req.user = jwt.verify(header.split(' ')[1], env.jwtSecret);
    return next();
  } catch {
    const error = new Error('Token invalido o expirado');
    error.status = 401;
    return next(error);
  }
};

export const requireRole = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user?.rol)) {
    const error = new Error('No tienes permisos para esta accion');
    error.status = 403;
    return next(error);
  }
  return next();
};
