import React from "react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const isTaxFree = [1, 2, 3].includes(product.category);

  return (
    <div className="card position-relative h-100 card-custom">
      {product.isImported && (
        <span className="badge bg-warning position-absolute top-0 start-0 m-2 text-dark">
          Imported
        </span>
      )}
      {isTaxFree && (
        <span className="badge bg-success position-absolute top-0 end-0 m-2">
          Tax Free
        </span>
      )}
      <img
        src="src\media\product-image.jpg"
        className="card-img-top"
        alt="product image"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title title-min-height">{product.name}</h5>
      </div>
      <p className="card-text ms-auto px-4">
        Price: €{product.price.toFixed(2)}
      </p>
      <button
        className="btn btn-sm btn-primary mt-auto mx-2 mb-2"
        onClick={() => onAddToBasket(product)}
      >
        Add To Basket
      </button>
    </div>
  );
}
