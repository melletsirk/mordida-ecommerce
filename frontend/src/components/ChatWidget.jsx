import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hola, soy el asistente Mordida. ¿En qué puedo ayudarte con los pedidos o productos?' }
  ]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!text.trim()) return;
    const userMessage = text;
    setMessages((current) => [
      ...current,
      { from: 'user', text: userMessage }
    ]);
    setText('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: userMessage })
      });
      const data = await response.json();
      
      if (data.respuesta) {
        setMessages((current) => [
          ...current,
          { from: 'bot', text: data.respuesta }
        ]);
      } else if (data.error) {
        setMessages((current) => [
          ...current,
          { from: 'bot', text: `Error: ${data.error}` }
        ]);
      } else {
        setMessages((current) => [
          ...current,
          { from: 'bot', text: 'No se pudo procesar la respuesta del servidor.' }
        ]);
      }
    } catch (error) {
      console.error("Error fetching chatbot:", error);
      setMessages((current) => [
        ...current,
        { from: 'bot', text: 'Ocurrió un error al conectar con el servidor.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-panel">
          <header>Asistente Mordida</header>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <p className={message.from} key={`${message.from}-${index}`}>{message.text}</p>
            ))}
            {loading && <p className="bot">Pensando...</p>}
          </div>
          <div className="chat-input">
            <input 
              value={text} 
              onChange={(event) => setText(event.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Escribe tu consulta" 
              disabled={loading}
            />
            <button onClick={send} aria-label="Enviar mensaje" disabled={loading}><Send size={17} /></button>
          </div>
        </section>
      )}
      <button className="chat-bubble" onClick={() => setOpen((value) => !value)} aria-label="Abrir chat">
        <MessageCircle size={25} />
      </button>
    </div>
  );
}
