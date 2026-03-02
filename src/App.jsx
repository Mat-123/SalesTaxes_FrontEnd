import React, { useState } from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light mb-3">
        <div className="container-fluid">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setPage("home")}
          >
            Home
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setPage("basket")}
          >
            Basket
          </button>
        </div>
      </nav>

      <div className="container">
        <Home />
      </div>
    </div>
  );
}

export default App;
