import { useContext } from "react";
import { ToastContext } from "./ToastContext";
import { Toast } from "./Toast";
import React from "react";

export const ToastContainer = ({ position = "top-right" }) => {
  const { toasts, removeToast } = useContext(ToastContext);
  const positionToasts = toasts.filter((toast) => toast.position === position);

  if (positionToasts.length === 0) return null;

  return (
    <div className={`toast-container toast-container-${position}`}>
      {positionToasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};
