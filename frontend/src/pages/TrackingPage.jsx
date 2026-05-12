import React from 'react';
import { CheckCircle2, MapPin } from 'lucide-react';
import { orderStates } from '../data/mockData.js';

export default function TrackingPage({ currentStatus = 'EN_CAMINO' }) {
  const activeIndex = orderStates.indexOf(currentStatus);

  return (
    <main className="tracking">
      <section>
        <span className="eyebrow">Pedido #1024</span>
        <h1>Rastreo en vivo</h1>
        <div className="timeline">
          {orderStates.map((state, index) => (
            <div className={`timeline-item ${index <= activeIndex ? 'done' : ''}`} key={state}>
              <CheckCircle2 size={20} />
              <span>{state.replaceAll('_', ' ')}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="route-sim">
        <div className="route-line"></div>
        <MapPin className="pin restaurant" size={28} />
        <MapPin className="pin home" size={28} />
        <div className="rider-dot"></div>
      </section>
    </main>
  );
}
