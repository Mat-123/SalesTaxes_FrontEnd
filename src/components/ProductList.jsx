import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onAddToBasket }) {
  return (
    <div className="d-flex flex-wrap gap-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAddToBasket={onAddToBasket} />
      ))}
    </div>
  );
}
