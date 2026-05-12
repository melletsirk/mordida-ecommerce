import { Minus, Plus, Trash2 } from 'lucide-react';

export function CartPage({ cart, updateQty, removeItem, total, setView }) {
  return (
    <main className="section narrow">
      <div className="section-heading"><h1>Tu carrito</h1></div>
      <div className="cart-list">
        {cart.length === 0 && <p className="empty">Tu carrito espera una buena mordida.</p>}
        {cart.map((item) => (
          <article className="cart-row" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>S/ {item.price.toFixed(2)}</p>
            </div>
            <div className="qty">
              <button onClick={() => updateQty(item.id, item.qty - 1)}><Minus size={16} /></button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={16} /></button>
            </div>
            <button className="icon-button" onClick={() => removeItem(item.id)}><Trash2 size={18} /></button>
          </article>
        ))}
      </div>
      <aside className="summary">
        <span>Total</span>
        <strong>S/ {total.toFixed(2)}</strong>
        <button className="primary" disabled={!cart.length} onClick={() => setView('checkout')}>Ir a checkout</button>
      </aside>
    </main>
  );
}

export function CheckoutPage({ cart, total, placeOrder }) {
  return (
    <main className="checkout">
      <section className="checkout-form">
        <span className="eyebrow">Pago simulado</span>
        <h1>Finalizar pedido</h1>
        <label>Direccion<input defaultValue="Av. Primavera 245, Lima" /></label>
        <label>Referencia<input placeholder="Piso, oficina o indicaciones" /></label>
        <label>Metodo de pago<select defaultValue="tarjeta-demo"><option value="tarjeta-demo">Tarjeta demo</option><option value="efectivo">Efectivo</option></select></label>
        <button className="primary" onClick={placeOrder}>Confirmar pedido</button>
      </section>
      <aside className="order-summary">
        <h2>Resumen</h2>
        {cart.map((item) => <p key={item.id}>{item.qty} x {item.name}<span>S/ {(item.qty * item.price).toFixed(2)}</span></p>)}
        <strong>Total <span>S/ {total.toFixed(2)}</span></strong>
      </aside>
    </main>
  );
}
