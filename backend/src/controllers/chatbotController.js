export const clienteChat = async (req, res) => {
  const pregunta = req.body?.mensaje || '';
  res.json({
    provider: 'mock',
    respuesta: `Soy el asistente Mordida en modo demo. Recibi: "${pregunta}". Pronto podre recomendar combos, revisar pedidos y resolver dudas con OpenAI API.`
  });
};

export const adminVentasChat = async (_req, res) => {
  res.json({
    provider: 'mock',
    respuesta: 'Resumen demo: las hamburguesas lideran ventas, los combos crecen en hora punta y el cupon MORDIDA10 mantiene buena conversion.'
  });
};
