import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BasketNotification({ show, onClose }) {
  const navigate = useNavigate();
  const duration = 5000;
  const intervalMs = 100;

  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!show) return;

    setProgress(100);

    const step = 100 / (duration / intervalMs);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - step;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 1050, minWidth: "380px" }}
    >
      <div className="alert alert-success shadow p-0 overflow-hidden">
        <div className="p-3 d-flex justify-content-between align-items-center">
          <strong>Product added to your Basket</strong>

          <div className="d-flex gap-2 align-items-center ms-3">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => navigate("/cart")}
            >
              Go to Basket
            </button>

            <button className="btn-close" onClick={onClose}></button>
          </div>
        </div>

        <div className="progress" style={{ height: "4px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{
              width: `${progress}%`,
              transition: `width ${intervalMs}ms linear`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
