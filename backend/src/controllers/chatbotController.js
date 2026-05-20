import { GoogleGenAI } from '@google/genai';
import { pool } from '../config/db.js';
import { env } from '../config/env.js';

// Inicializar el SDK de Gemini
const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

// Resumen del esquema para inyectar en el prompt
const schemaText = `
Tablas principales de la base de datos PostgreSQL de la hamburguesería Mordida:
- categorias(id, nombre, slug)
- productos(id, categoria_id, nombre, descripcion, precio, disponible, destacado, creado_en)
- usuarios(id, nombre, email, rol, direccion, creado_en)
- pedidos(id, usuario_id, repartidor_id, direccion_entrega, metodo_pago, cupon_codigo, subtotal, total, estado, creado_en)
- pedido_detalle(id, pedido_id, producto_id, cantidad, precio_unitario)
`;

export const askChatbot = async (req, res) => {
  try {
    const pregunta = req.body?.pregunta || req.body?.mensaje || '';
    if (!pregunta) {
      return res.status(400).json({ error: 'Falta la pregunta del usuario en el body (usa "pregunta" o "mensaje")' });
    }

    if (!env.geminiApiKey) {
      return res.status(500).json({ error: 'La API Key de Gemini no está configurada en las variables de entorno' });
    }

    // -------------------------------------------------------------
    // Paso 1: Generar la consulta SQL con Gemini
    // -------------------------------------------------------------
    const sqlPrompt = `
Eres un asistente experto en bases de datos que convierte lenguaje natural a consultas SQL para PostgreSQL.
Esquema de la base de datos de la hamburguesería:
${schemaText}

Tu única tarea es devolver la consulta SQL pura que responda a la pregunta del usuario, sin markdown (como \`\`\`sql), sin explicaciones y sin texto adicional. Debe estar lista para ser ejecutada directamente.

Pregunta del usuario: ${pregunta}
`;

    const sqlResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: sqlPrompt
    });

    let sqlQuery = sqlResponse.text.trim();
    // Limpiar posibles bloques de markdown en caso de que el LLM no obedezca del todo
    sqlQuery = sqlQuery.replace(/```sql/gi, '').replace(/```/g, '').trim();

    // -------------------------------------------------------------
    // Paso 2: Ejecutar la consulta en la base de datos
    // -------------------------------------------------------------
    let dbResult;
    try {
      const { rows } = await pool.query(sqlQuery);
      dbResult = rows;
    } catch (dbError) {
      console.error('Error al ejecutar SQL:', dbError);
      return res.status(500).json({ 
        error: 'Error al ejecutar la consulta SQL generada en la base de datos.', 
        sql_generado: sqlQuery,
        detalle_error: dbError.message
      });
    }

    // -------------------------------------------------------------
    // Paso 3: Generar la respuesta final en lenguaje natural con Gemini
    // -------------------------------------------------------------
    const nlPrompt = `
Eres un asistente virtual de un ecommerce de hamburguesas llamado "Mordida".
Tu tarea es responder a la pregunta del usuario de forma amable, concisa y útil, basándote ÚNICAMENTE en los resultados de la base de datos proporcionados a continuación en formato JSON.
No menciones la base de datos ni los términos técnicos como JSON o SQL en tu respuesta.

Pregunta del usuario: "${pregunta}"

Resultados obtenidos (JSON):
${JSON.stringify(dbResult)}
`;

    const nlResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: nlPrompt
    });

    const respuestaFinal = nlResponse.text;

    // Enviar la respuesta
    res.json({
      respuesta: respuestaFinal,
      // Se envían los detalles adicionales por si son útiles para el frontend o debugging en el proyecto universitario
      debug: {
        sql: sqlQuery,
        datos: dbResult
      }
    });

  } catch (error) {
    console.error('Error en Text-to-SQL Chatbot:', error);
    res.status(500).json({ error: 'Ocurrió un error inesperado procesando la solicitud del chatbot.' });
  }
};
