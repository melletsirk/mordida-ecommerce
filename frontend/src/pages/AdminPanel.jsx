import { coupons, orderStates, sampleOrders } from '../data/mockData.js';

export default function AdminPanel({ products }) {
  return (
    <main className="admin-layout">
      <aside className="admin-sidebar">
        <strong>Mordida Admin</strong>
        <span>Dashboard</span>
        <span>Pedidos</span>
        <span>Productos</span>
        <span>Cupones</span>
        <span>Usuarios</span>
        <span>Analitica</span>
      </aside>
      <section className="admin-content">
        <div className="metric-grid">
          <div><span>Ventas hoy</span><strong>S/ 1,284</strong></div>
          <div><span>Pedidos activos</span><strong>18</strong></div>
          <div><span>Ticket promedio</span><strong>S/ 36.70</strong></div>
          <div><span>Conversion cupones</span><strong>22%</strong></div>
        </div>
        <div className="management-grid">
          <section>
            <h2>Pedidos en tiempo real</h2>
            {sampleOrders.map((order) => (
              <article className="admin-row" key={order.id}>
                <span>#{order.id} {order.customer}</span>
                <select defaultValue={order.status}>{orderStates.map((state) => <option key={state}>{state}</option>)}</select>
              </article>
            ))}
          </section>
          <section>
            <h2>Gestion de productos</h2>
            {products.slice(0, 5).map((product) => (
              <article className="admin-row" key={product.id}><span>{product.name}</span><b>S/ {product.price.toFixed(2)}</b></article>
            ))}
          </section>
          <section>
            <h2>Cupones</h2>
            {coupons.map((coupon) => (
              <article className="admin-row" key={coupon.code}><span>{coupon.code}</span><b>{coupon.active ? 'Activo' : 'Pausado'}</b></article>
            ))}
          </section>
          <section>
            <h2>Usuarios</h2>
            {['Cliente Mordida', 'Admin Mordida', 'Rayo Rider'].map((user) => <article className="admin-row" key={user}><span>{user}</span><b>Ver</b></article>)}
          </section>
        </div>
      </section>
    </main>
  );
}
