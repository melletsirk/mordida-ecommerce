import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, rol: user.rol },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
