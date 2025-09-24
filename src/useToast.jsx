import { useContext } from "react";
import React from "react";
import { ToastContext } from "./ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { addToast, removeToast, clearAllToasts } = context;

  const toast = {
    success: (message, options) =>
      addToast(message, { ...options, type: "success" }),
    error: (message, options) =>
      addToast(message, { ...options, type: "error" }),
    warning: (message, options) =>
      addToast(message, { ...options, type: "warning" }),
    info: (message, options) => addToast(message, { ...options, type: "info" }),
    loading: (message, options) =>
      addToast(message, { ...options, type: "loading", duration: 0 }),
    custom: addToast,
    dismiss: removeToast,
    clear: clearAllToasts,
  };

  return toast;
};
