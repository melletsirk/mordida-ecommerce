export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: err.message || 'Error interno del servidor'
  });
};
