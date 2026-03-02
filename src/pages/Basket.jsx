export default function Basket({ basket, onRemove, onDecrease }) {
  const total = basket.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (basket.length === 0) {
    return <h4>Your basket is empty</h4>;
  }

  return (
    <div>
      <h3 className="mb-4">Your basket</h3>

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
    </div>
  );
}
