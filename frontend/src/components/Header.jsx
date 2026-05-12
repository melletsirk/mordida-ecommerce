import { Menu, ShoppingBag, UserRound } from 'lucide-react';

const navItems = [
  ['inicio', 'Inicio'],
  ['menu', 'Menu'],
  ['tracking', 'Rastreo'],
  ['historial', 'Historial'],
  ['admin', 'Admin'],
  ['repartidor', 'Repartidor']
];

export default function Header({ view, setView, cartCount }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => setView('inicio')} aria-label="Ir al inicio">
        <span className="brand-mark">M</span>
        <span>Mordida</span>
      </button>
      <nav>
        {navItems.map(([key, label]) => (
          <button className={view === key ? 'active' : ''} key={key} onClick={() => setView(key)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => setView('login')} title="Cuenta">
          <UserRound size={19} />
        </button>
        <button className="cart-button" onClick={() => setView('carrito')}>
          <ShoppingBag size={19} />
          <span>{cartCount}</span>
        </button>
        <button className="icon-button mobile-only" title="Menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
