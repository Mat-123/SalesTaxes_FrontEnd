import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Basket from "./pages/Basket";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import BasketNotification from "./components/BasketNotification";

function App() {
  const [basket, setBasket] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const addToBasket = (product) => {
    setBasket((prev) => {
      const alreadyAdded = prev.find((p) => p.id === product.id);
      if (alreadyAdded) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setShowNotification(true);
  };

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((p) => p.id !== id));
  };

  const reduceQuantity = (id) => {
    setBasket((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0),
    );
  };

  const increaseQuantity = (id) => {
    setBasket((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
        .filter((p) => p.quantity > 0),
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <>
      {" "}
      <BasketNotification
        show={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <div>
        <nav className="navbar navbar-dark bg-dark mb-3">
          <div className="container-fluid px-5">
            <a className="navbar-brand me-auto" href="#">
              Sales Taxes Shop
            </a>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "fw-bold border-bottom border-3" : ""}`
              }
            >
              HOME
            </NavLink>

            <NavLink
              to="/basket"
              className={({ isActive }) =>
                `nav-link text-white ms-3 ${isActive ? "fw-bold border-bottom border-3" : ""}`
              }
            >
              BASKET ({basket.reduce((acc, p) => acc + p.quantity, 0)})
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `nav-link text-white ms-3 ${isActive ? "fw-bold border-bottom border-3" : ""}`
              }
            >
              ORDERS
            </NavLink>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home onAddToBasket={addToBasket} />} />
            <Route
              path="/basket"
              element={
                <Basket
                  basket={basket}
                  onDecrease={reduceQuantity}
                  onRemove={removeFromBasket}
                  onIncrease={increaseQuantity}
                  onClearBasket={clearBasket}
                />
              }
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
