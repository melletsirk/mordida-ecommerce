import React from 'react';
import { Plus } from 'lucide-react';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-body">
        <span className="chip">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <strong>S/ {product.price.toFixed(2)}</strong>
          <button onClick={() => onAdd(product)}>
            <Plus size={18} />
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
