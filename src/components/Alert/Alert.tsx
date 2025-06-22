"use client";
import React from "react";

type Alert = {
  message: string;
  onClose: () => void;
};

export default function Alert({ message, onClose }: Alert) {
  return (
    <div className="popup-overlay">
      <div className="popup-content pixel-border">
        <p>{message}</p>
        <button onClick={onClose} className="button">
          OK
        </button>
      </div>
    </div>
  );
}
