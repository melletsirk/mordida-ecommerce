import React from 'react';
import { Check, Navigation } from 'lucide-react';

export default function DeliveryPanel() {
  return (
    <main className="delivery-layout">
      <section>
        <span className="eyebrow">Rayo Rider</span>
        <h1>Pedidos asignados</h1>
        {[1024, 1027].map((id) => (
          <article className="delivery-card" key={id}>
            <div>
              <strong>Pedido #{id}</strong>
              <p>Av. Primavera 245 - 18 min estimados</p>
            </div>
            <div className="delivery-actions">
              <button><Check size={17} /> Aceptar</button>
              <button><Check size={17} /> Recogido</button>
              <button><Check size={17} /> Entregado</button>
            </div>
          </article>
        ))}
      </section>
      <section className="route-sim delivery-map">
        <Navigation className="nav-icon" size={36} />
        <div className="route-line"></div>
        <div className="rider-dot"></div>
      </section>
    </main>
  );
}
