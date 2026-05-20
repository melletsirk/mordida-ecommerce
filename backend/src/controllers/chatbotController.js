import { GoogleGenAI } from '@google/genai';
import { pool } from '../config/db.js';
import { env } from '../config/env.js';

const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

// ─── Esquema de la base de datos ────────────────────────────────────────────
const schemaText = `
Tablas principales de la base de datos PostgreSQL de la hamburguesería Mordida:
- categorias(id, nombre, slug)
- productos(id, categoria_id, nombre, descripcion, precio, disponible, destacado, creado_en)
- usuarios(id, nombre, email, rol, direccion, creado_en)
- pedidos(id, usuario_id, repartidor_id, direccion_entrega, metodo_pago, cupon_codigo, subtotal, total, estado, creado_en)
- pedido_detalle(id, pedido_id, producto_id, cantidad, precio_unitario)
`;

// ─── Palabras clave que indican una pregunta relevante al ecommerce ──────────
const KEYWORDS_RELEVANTES = [
  'pedido', 'producto', 'hamburgues', 'precio', 'categoria', 'usuario',
  'venta', 'total', 'cupon', 'envio', 'repartidor', 'disponible', 'menu',
  'orden', 'compra', 'pago', 'cliente', 'stock', 'destacado', 'mordida',
  'cuanto', 'cuánto', 'lista', 'mostrar', 'ver', 'cuántos', 'cuantos',
];

// ─── Comandos SQL peligrosos (solo lectura permitida) ────────────────────────
const SQL_PELIGROSO = /^\s*(drop|delete|truncate|insert|update|alter|create|grant|revoke)\s/i;

// ─── Helper: reintento automático en caso de 503 ────────────────────────────
async function generateConReintento(promptText, maxIntentos = 3) {
  let ultimoError;
  for (let intento = 1; intento <= maxIntentos; intento++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptText,
      });
      return response;
    } catch (error) {
      ultimoError = error;
      if (error.status === 503) {
        console.warn(`Intento ${intento}: Gemini saturado (503). Reintentando en 1.5s...`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        throw error;
      }
    }
  }
  throw ultimoError;
}

// ─── Helper: verificar si la pregunta es relevante sin llamar a la API ───────
function esConsultaRelevante(pregunta) {
  const texto = pregunta.toLowerCase();
  return KEYWORDS_RELEVANTES.some((kw) => texto.includes(kw));
}

// ─── Controlador principal ───────────────────────────────────────────────────
export const askChatbot = async (req, res) => {
  try {
    const pregunta = (req.body?.pregunta || req.body?.mensaje || '').trim();

    if (!pregunta) {
      return res.status(400).json({
        error: 'Falta la pregunta en el body (usa "pregunta" o "mensaje").',
      });
    }

    if (!env.geminiApiKey) {
      return res.status(500).json({
        error: 'La API Key de Gemini no está configurada en las variables de entorno.',
      });
    }

    // ── Filtro local: rechazar preguntas sin relación al ecommerce ────────────
    // Evita gastar un token de API en preguntas como "¿Cuál es la capital de Francia?"
    if (!esConsultaRelevante(pregunta)) {
      return res.json({
        respuesta:
          '¡Hola! Solo puedo ayudarte con consultas sobre Mordida: productos, pedidos, precios, categorías y más. ¿En qué te puedo ayudar?',
        debug: { sql: null, datos: null },
      });
    }

    // ── Paso único: un solo prompt que devuelve JSON estructurado ─────────────
    // Al combinar la generación de SQL y la respuesta natural en una sola llamada
    // se reduce el consumo de la API a la mitad por solicitud.
    const promptCombinado = `
Eres el asistente inteligente del ecommerce de hamburguesas "Mordida".
Tu trabajo es responder preguntas sobre el negocio consultando una base de datos PostgreSQL.

${schemaText}

INSTRUCCIONES:
1. Lee la pregunta del usuario.
2. Si la pregunta NO tiene relación con el ecommerce (productos, pedidos, usuarios, ventas, etc.),
   responde SOLO con este JSON: {"fuera_de_tema": true}
3. Si es relevante, genera una consulta SQL de solo lectura (SELECT) que responda la pregunta.
4. Devuelve ÚNICAMENTE un objeto JSON con esta estructura exacta, sin markdown ni texto extra:
{
  "fuera_de_tema": false,
  "sql": "<consulta SELECT aquí>"
}

REGLAS para el SQL:
- Solo SELECT. Nunca DROP, DELETE, UPDATE, INSERT, ALTER, TRUNCATE.
- Sin punto y coma al final.
- Usa alias claros en español cuando sea posible (ej: precio AS precio_unitario).
- Limita resultados con LIMIT 50 si el resultado podría ser muy extenso.

Pregunta del usuario: "${pregunta}"
`;

    const sqlResponse = await generateConReintento(promptCombinado);

    let rawText = (sqlResponse.text || '').trim();
    rawText = rawText.replace(/```json|```/gi, '').trim();

    // ── Parsear respuesta JSON del modelo ─────────────────────────────────────
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      console.error('Gemini no devolvió JSON válido:', rawText);
      return res.status(500).json({
        error: 'El modelo devolvió una respuesta inesperada. Intenta reformular tu pregunta.',
      });
    }

    // ── El modelo detectó una pregunta fuera de tema ──────────────────────────
    if (parsed.fuera_de_tema) {
      return res.json({
        respuesta:
          '¡Hola! Solo puedo ayudarte con consultas sobre Mordida: productos, pedidos, precios, categorías y más. ¿En qué te puedo ayudar?',
        debug: { sql: null, datos: null },
      });
    }

    // ── Validación de seguridad: bloquear SQL peligroso ───────────────────────
    const sqlQuery = (parsed.sql || '').trim();
    if (!sqlQuery || SQL_PELIGROSO.test(sqlQuery)) {
      console.warn('SQL bloqueado por seguridad:', sqlQuery);
      return res.status(400).json({
        error: 'La consulta generada no está permitida. Solo se aceptan consultas de lectura.',
        debug: { sql: sqlQuery },
      });
    }

    // ── Ejecutar la consulta en la base de datos ──────────────────────────────
    let dbResult;
    try {
      const { rows } = await pool.query(sqlQuery);
      dbResult = rows;
    } catch (dbError) {
      console.error('Error al ejecutar SQL:', dbError);
      return res.status(500).json({
        error: 'No pude obtener esa información de la base de datos. Intenta reformular tu pregunta.',
        debug: { sql: sqlQuery, detalle_error: dbError.message },
      });
    }

    // ── Sin resultados: respuesta amigable sin llamar a la API de nuevo ───────
    if (dbResult.length === 0) {
      return res.json({
        respuesta: 'No encontré información relacionada con tu consulta. ¿Puedes darme más detalles?',
        debug: { sql: sqlQuery, datos: [] },
      });
    }

    // ── Generar respuesta en lenguaje natural (segunda llamada solo si hay datos) ──
    const nlPrompt = `
Eres el asistente virtual de "Mordida", una hamburguesería online.
Responde de forma amable, breve y útil a la pregunta del usuario basándote ÚNICAMENTE en los datos JSON proporcionados.
No menciones términos técnicos como SQL, JSON o base de datos.
Si los datos contienen una lista, preséntala de forma clara y legible.

Pregunta: "${pregunta}"
Datos: ${JSON.stringify(dbResult)}
`;

    const nlResponse = await generateConReintento(nlPrompt);
    const respuestaFinal =
      nlResponse.text?.trim() ||
      'El servicio está muy saturado en este momento. Por favor intenta de nuevo en unos segundos.';

    return res.json({
      respuesta: respuestaFinal,
      debug: { sql: sqlQuery, datos: dbResult },
    });

  } catch (error) {
    console.error('Error en chatbot:', error);
    return res.status(500).json({
      error: 'Ocurrió un error inesperado. Por favor intenta de nuevo.',
    });
  }
};