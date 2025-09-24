import React from "react";

export const ToastStyles = () => (
  <style>{`
    .toast-container {
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 420px;
      padding: 16px;
    }

    .toast-container-top-right {
      top: 0;
      right: 0;
    }

    .toast-container-top-left {
      top: 0;
      left: 0;
    }

    .toast-container-top-center {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .toast-container-bottom-right {
      bottom: 0;
      right: 0;
      flex-direction: column-reverse;
    }

    .toast-container-bottom-left {
      bottom: 0;
      left: 0;
      flex-direction: column-reverse;
    }

    .toast-container-bottom-center {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      flex-direction: column-reverse;
    }

    .toast {
      pointer-events: auto;
      background: var(--toast-bg, #ffffff);
      border: 1.5px solid var(--toast-border, rgba(0, 0, 0, 0.08));
      border-radius: 16px;
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04),
        0 0 0 1px rgba(255, 255, 255, 0.8) inset;
      backdrop-filter: blur(12px);
      overflow: hidden;
      width: 100%;
      max-width: 420px;
      transform: translateY(-120px) scale(0.95);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      position: relative;
    }

    .toast-visible {
      transform: translateY(0) scale(1);
      opacity: 1;
    }

    .toast-bottom {
      transform: translateY(120px) scale(0.95);
    }

    .toast-bottom.toast-visible {
      transform: translateY(0) scale(1);
    }

    .toast-content {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
    }

    .toast-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      flex-shrink: 0;
      box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.12),
        0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    }

    .toast-icon-loading {
      animation: toast-spin 1.5s linear infinite;
    }

    .toast-body {
      flex: 1;
      min-width: 0;
      margin-top: 2px;
    }

    .toast-title {
      font-weight: 700;
      font-size: 15px;
      color: #111827;
      margin-bottom: 6px;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }

    .toast-message {
      font-size: 14px;
      color: #4b5563;
      line-height: 1.5;
      word-wrap: break-word;
      font-weight: 400;
    }

    .toast-action {
      background: none;
      border: none;
      color: var(--toast-color);
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      transition: background-color 0.2s;
      margin-top: 2px;
    }

    .toast-action:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .toast-close {
      background: none;
      border: none;
      color: #9ca3af;
      font-size: 20px;
      font-weight: 300;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
      border-radius: 4px;
      transition: color 0.2s, background-color 0.2s;
      margin-top: 2px;
    }

    .toast-close:hover {
      color: #6b7280;
      background: rgba(0, 0, 0, 0.05);
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: var(--toast-color);
      transition: width 0.1s linear;
      opacity: 0.8;
    }

    .toast-progress-indeterminate {
      width: 100%;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      overflow: hidden;
    }

    .toast-progress-indeterminate::before {
      content: '';
      position: absolute;
      width: 30%;
      height: 100%;
      background: inherit;
      animation: toast-indeterminate 2s infinite;
    }

    @keyframes toast-indeterminate {
      0% { left: -30%; }
      100% { left: 100%; }
    }

    @media (max-width: 640px) {
      .toast-container {
        left: 0 !important;
        right: 0 !important;
        transform: none !important;
        max-width: none;
        padding: 12px;
      }

      .toast {
        max-width: none;
      }
    }

    @keyframes toast-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes toast-loading {
      0% { opacity: 0.4; }
      50% { opacity: 1; }
      100% { opacity: 0.4; }
    }
  `}</style>
);
