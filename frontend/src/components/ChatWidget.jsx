import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hola, soy el asistente Mordida. Estoy en modo demo.' }
  ]);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMessages((current) => [
      ...current,
      { from: 'user', text },
      { from: 'bot', text: 'Respuesta mock: pronto podre conectarme a OpenAI API para ayudarte mejor.' }
    ]);
    setText('');
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
          </div>
          <div className="chat-input">
            <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Escribe tu consulta" />
            <button onClick={send} aria-label="Enviar mensaje"><Send size={17} /></button>
          </div>
        </section>
      )}
      <button className="chat-bubble" onClick={() => setOpen((value) => !value)} aria-label="Abrir chat">
        <MessageCircle size={25} />
      </button>
    </div>
  );
}
