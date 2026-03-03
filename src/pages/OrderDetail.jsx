import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/orders/${id}`)
      .then((res) => res.json())
      .then(setOrder)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!order) return <p>Loading...</p>;
  if (!order.items || !Array.isArray(order.items))
    return <p>No items in order</p>;

  return (
    <div>
      <h3>Order {order.orderId}</h3>
      <p>Created at: {new Date(order.createdAt).toLocaleString()}</p>

      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Unit Tax</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>€{(item.unitPrice ?? 0).toFixed(2)}</td>
              <td>€{(item.unitTax ?? 0).toFixed(2)}</td>
              <td>€{(item.lineTotal ?? 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h5>Total Taxes: €{(order.totalTaxes ?? 0).toFixed(2)}</h5>
      <h4>Total Price: €{(order.totalPrice ?? 0).toFixed(2)}</h4>
    </div>
  );
}
