import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productsApi";
import { CategoryMap } from "../constants/categories";
import ProductList from "../components/ProductList";

export default function Home({ onAddToBasket }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      const addCategory = data.map((p) => ({
        ...p,
        categoryName: CategoryMap[p.category] || "Other",
      }));
      setProducts(addCategory);
    });
  }, []);

  return (
    <div className="d-flex gap-3">
      <div className="flex-grow-1">
        <ProductList products={products} onAddToBasket={onAddToBasket} />
      </div>
    </div>
  );
}
