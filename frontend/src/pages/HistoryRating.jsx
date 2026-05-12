export function HistoryPage({ setView }) {
  const history = [
    ['#1024', 'Doble Mordida + Papas Mordida', 'ENTREGADO', 'S/ 34.02'],
    ['#1018', 'Combo Pareja', 'ENTREGADO', 'S/ 49.90'],
    ['#1009', 'Lechuga Crunch', 'CANCELADO', 'S/ 21.90']
  ];

  return (
    <main className="section narrow">
      <div className="section-heading"><h1>Historial de pedidos</h1></div>
      <div className="table-like">
        {history.map((row) => (
          <article key={row[0]}>
            <strong>{row[0]}</strong>
            <span>{row[1]}</span>
            <b>{row[2]}</b>
            <button onClick={() => setView('calificar')}>Calificar</button>
          </article>
        ))}
      </div>
    </main>
  );
}

export function RatingPage() {
  return (
    <main className="auth-layout">
      <section className="auth-card">
        <span className="eyebrow">Pedido #1024</span>
        <h1>Califica tu experiencia</h1>
        <div className="stars">★★★★★</div>
        <textarea placeholder="Cuenta como estuvo tu pedido" rows="5"></textarea>
        <button className="primary">Enviar calificacion</button>
      </section>
    </main>
  );
}
