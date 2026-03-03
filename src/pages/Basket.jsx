import React, { useState } from "react";

export default function Basket({
  basket,
  onRemove,
  onDecrease,
  onIncrease,
  onClearBasket,
}) {
  const [loading, setLoading] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  const [error, setError] = useState(null);

  const total = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (basket.length === 0 && !orderResponse) {
    return <h4>Your basket is empty</h4>;
  }

  const handleCheckout = async () => {
    if (basket.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const payload = basket.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const res = await fetch("/api/v1/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      const data = await res.json();
      setOrderResponse(data);
      console.log("Order response:", data);

      if (onClearBasket) {
        onClearBasket();
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Your basket</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {basket.length > 0 && (
        <>
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {basket.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>

                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onDecrease(item.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onIncrease(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td>€{(item.price * item.quantity).toFixed(2)}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h4>Total: €{total.toFixed(2)}</h4>
          </div>

          <div className="text-end">
            <button
              className="btn btn-success"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}

      {orderResponse && (
        <div className="mt-4 alert alert-info">
          <h5>Order placed successfully!</h5>
          <p>Order ID: {orderResponse.orderId}</p>
          <p>Total: €{orderResponse.totalPrice.toFixed(2)}</p>

          <h6>Items:</h6>
          <ul>
            {orderResponse.items.map((item) => (
              <li key={item.productId}>
                {item.name} x {item.quantity} — €{item.lineTotal.toFixed(2)}{" "}
                (Tax: €{item.unitTax.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
