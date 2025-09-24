import { useEffect, useRef, useState } from "react";
import React from "react";
import { TOAST_TYPES } from "./utils/ToastTypes";

export const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(toast.duration);

  const typeConfig = TOAST_TYPES[toast.type] || TOAST_TYPES.info;

  useEffect(() => {
    // Show animation
    const showTimer = setTimeout(() => setIsVisible(true), 10);

    // Auto dismiss timer
    if (toast.duration && toast.duration > 0) {
      startTimer();
    }

    return () => {
      clearTimeout(showTimer);
      clearTimer();
    };
  }, []);

  const startTimer = () => {
    if (!toast.duration || toast.duration === 0) return;

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleClose();
    }, remainingTimeRef.current);

    // Progress bar animation
    const progressTimer = setInterval(() => {
      if (!isPaused) {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.max(
          0,
          ((remainingTimeRef.current - elapsed) / toast.duration) * 100
        );
        setProgress(newProgress);

        if (newProgress <= 0) {
          clearInterval(progressTimer);
        }
      }
    }, 50);

    return () => clearInterval(progressTimer);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const pauseTimer = () => {
    if (!toast.duration || isPaused) return;

    setIsPaused(true);
    clearTimer();

    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
  };

  const resumeTimer = () => {
    if (!toast.duration || !isPaused) return;

    setIsPaused(false);
    startTimer();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const handleAction = () => {
    if (toast.action?.onClick) {
      toast.action.onClick();
    }
    handleClose();
  };

  return (
    <div
      className={`toast ${isVisible ? "toast-visible" : ""} toast-${
        toast.position.split("-")[0]
      }`}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      style={{
        "--toast-color": typeConfig.color,
        "--toast-bg": typeConfig.gradient,
        "--toast-border": `${typeConfig.color}20`,
      }}
    >
      <div className="toast-content">
        <div
          className={`toast-icon toast-icon-${toast.type}`}
          style={{
            background: typeConfig.iconBg,
            color: "#ffffff",
          }}
        >
          {typeConfig.icon}
        </div>

        <div className="toast-body">
          {toast.title && <div className="toast-title">{toast.title}</div>}
          <div className="toast-message">{toast.message}</div>
        </div>

        {toast.action && (
          <button
            className="toast-action"
            onClick={handleAction}
            style={{
              background: `${typeConfig.color}15`,
              color: typeConfig.color,
              border: `1px solid ${typeConfig.color}30`,
            }}
          >
            {toast.action.label}
          </button>
        )}

        <button
          className="toast-close"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {toast.duration && toast.duration > 0 ? (
        <div
          className="toast-progress"
          style={{
            width: `${progress}%`,
            backgroundColor: typeConfig.color,
          }}
        />
      ) : toast.type === "loading" ? (
        <div
          className="toast-progress toast-progress-indeterminate"
          style={{
            backgroundColor: typeConfig.color,
          }}
        />
      ) : null}
    </div>
  );
};
