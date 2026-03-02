import React from "react";

export default function ProductCard({ product }) {
  const isTaxFree = [1, 2, 3].includes(product.category);

  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div className="mb-2">
          {product.isImported && (
            <span className="badge bg-warning me-1">Imported</span>
          )}
          {isTaxFree && <span className="badge bg-success">Tax Free</span>}
        </div>
        <p className="card-text">Price: €{product.price.toFixed(2)}</p>
        <button
          className="btn btn-sm btn primary"
          onClick={() => onAddToBasket(product)}
        >
          Add To Basket
        </button>
      </div>
    </div>
  );
}
