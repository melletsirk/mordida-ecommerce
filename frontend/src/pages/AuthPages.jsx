import React from 'react';

export function LoginPage({ setView }) {
  return (
    <main className="auth-layout">
      <section className="auth-card">
        <span className="eyebrow">Bienvenido de vuelta</span>
        <h1>Iniciar sesion</h1>
        <input placeholder="Email" defaultValue="cliente@mordida.test" />
        <input placeholder="Password" type="password" defaultValue="123456" />
        <button className="primary" onClick={() => setView('menu')}>Entrar</button>
        <button className="link-button" onClick={() => setView('registro')}>Crear cuenta</button>
      </section>
    </main>
  );
}

export function RegisterPage({ setView }) {
  return (
    <main className="auth-layout">
      <section className="auth-card">
        <span className="eyebrow">Tu primera mordida</span>
        <h1>Registro</h1>
        <input placeholder="Nombre completo" />
        <input placeholder="Email" />
        <input placeholder="Telefono" />
        <input placeholder="Password" type="password" />
        <button className="primary" onClick={() => setView('menu')}>Crear cuenta</button>
      </section>
    </main>
  );
}
