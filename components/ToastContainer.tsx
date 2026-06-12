import React from "react";

export interface Toast {
  id: string;
  text: string;
  gold?: boolean;
}

interface ToastContainerProps {
  toasts: Toast[];
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div className="toast-wrap" id="toastWrap">
      {toasts.map((toast) => (
        <div className={`toast ${toast.gold ? "gold" : ""}`} key={toast.id}>
          {toast.text}
        </div>
      ))}
    </div>
  );
}
