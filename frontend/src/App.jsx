import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import LandingPage from './pages/LandingPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import { LoginPage, RegisterPage } from './pages/AuthPages.jsx';
import { CartPage, CheckoutPage } from './pages/CartCheckout.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import { HistoryPage, RatingPage } from './pages/HistoryRating.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import DeliveryPanel from './pages/DeliveryPanel.jsx';
import { products } from './data/mockData.js';

export default function App() {
  const [view, setView] = useState('inicio');
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [lastStatus, setLastStatus] = useState('EN_CAMINO');

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...current, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart((current) => current.filter((item) => item.id !== id));
      return;
    }
    setCart((current) => current.map((item) => item.id === id ? { ...item, qty } : item));
  };

  const placeOrder = () => {
    setCart([]);
    setLastStatus('PENDIENTE');
    setView('tracking');
  };

  const pages = {
    inicio: <LandingPage products={products} onAdd={addToCart} setView={setView} />,
    login: <LoginPage setView={setView} />,
    registro: <RegisterPage setView={setView} />,
    menu: <MenuPage products={products} category={category} setCategory={setCategory} onAdd={addToCart} />,
    carrito: <CartPage cart={cart} updateQty={updateQty} removeItem={(id) => updateQty(id, 0)} total={total} setView={setView} />,
    checkout: <CheckoutPage cart={cart} total={total} placeOrder={placeOrder} />,
    tracking: <TrackingPage currentStatus={lastStatus} />,
    historial: <HistoryPage setView={setView} />,
    calificar: <RatingPage />,
    admin: <AdminPanel products={products} />,
    repartidor: <DeliveryPanel />
  };

  return (
    <>
      <Header view={view} setView={setView} cartCount={cartCount} />
      {pages[view]}
      <ChatWidget />
    </>
  );
}
