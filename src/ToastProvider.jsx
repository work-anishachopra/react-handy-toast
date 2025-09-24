import React, { useState } from "react";
import { ToastContext } from "./ToastContext";
import { ToastContainer } from "./ToastContainer";
import { ToastStyles } from "./ToastStyles";

export const ToastProvider = ({ children, maxToasts = 5 }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, options = {}) => {
    const toast = {
      id: Date.now() + Math.random(),
      message,
      type: options.type || "info",
      title: options.title,
      duration: options.duration !== undefined ? options.duration : 4000,
      position: options.position || "top-right",
      action: options.action,
      ...options,
    };

    setToasts((prev) => {
      const newToasts = [toast, ...prev];
      return newToasts.slice(0, maxToasts);
    });

    return toast.id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearAllToasts }}
    >
      {children}

      <ToastContainer position="top-right" />
      <ToastContainer position="top-left" />
      <ToastContainer position="top-center" />
      <ToastContainer position="bottom-right" />
      <ToastContainer position="bottom-left" />
      <ToastContainer position="bottom-center" />

      <ToastStyles />
    </ToastContext.Provider>
  );
};
