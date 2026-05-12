import React from 'react';
import ProductCard from '../components/ProductCard.jsx';

export default function LandingPage({ products, onAdd, setView }) {
  const featured = products.filter((product) => product.featured);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Fast food con caracter</span>
          <h1>Mordida</h1>
          <p>Hamburguesas jugosas, papas crujientes y combos listos para llegar calientes a tu puerta.</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => setView('menu')}>Pedir ahora</button>
            <button className="secondary" onClick={() => setView('tracking')}>Rastrear pedido</button>
          </div>
        </div>
        <div className="hero-visual" aria-label="Hamburguesa destacada">
          <img src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1100&q=85" alt="Hamburguesa Mordida" />
          <div className="deal-badge">Combo desde S/ 32.90</div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Favoritos</span>
          <h2>Los mas pedidos</h2>
        </div>
        <div className="product-grid">
          {featured.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
        </div>
      </section>
    </main>
  );
}
