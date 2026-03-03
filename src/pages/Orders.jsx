import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/v1/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <h3>Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>€{order.totalPrice.toFixed(2)}</td>
              <td>
                <Link
                  className="btn btn-sm btn-primary"
                  to={`/orders/${order.orderId}`}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
