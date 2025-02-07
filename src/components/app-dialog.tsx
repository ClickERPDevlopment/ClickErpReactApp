import React, { useEffect, useState } from "react";
import { Button } from "src/components/ui/button";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Pass any component as children
  title: string; // Dialog title
  description?: string; // Optional description
}

export default function AppDialog({
  isOpen,
  onClose,
  children,
  title,
  description,
}: CustomDialogProps) {
  const [show, setShow] = useState(false);

  // Handle transitions
  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setTimeout(() => setShow(false), 200); // Wait for animation to complete
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        opacity: isOpen ? 1 : 0,
        transition: "opacity 200ms ease-in-out",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "400px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative",
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          transition: "transform 200ms ease-in-out",
        }}
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#6b7280",
          }}
          aria-label="Close"
          variant={"ghost"}
        >
          &times;
        </Button>

        {/* Header */}
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
            {title}
          </h2>
          {description && (
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
              {description}
            </p>
          )}
        </div>

        {/* Dynamic Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
