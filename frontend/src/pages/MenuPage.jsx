import ProductCard from '../components/ProductCard.jsx';
import { categories } from '../data/mockData.js';

export default function MenuPage({ products, category, setCategory, onAdd }) {
  const filtered = category === 'Todos' ? products : products.filter((product) => product.category === category);

  return (
    <main className="section">
      <div className="section-heading">
        <span className="eyebrow">Menu Mordida</span>
        <h1>Elige tu antojo</h1>
      </div>
      <div className="tabs">
        {categories.map((item) => (
          <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>
        ))}
      </div>
      <div className="product-grid">
        {filtered.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}
      </div>
    </main>
  );
}
