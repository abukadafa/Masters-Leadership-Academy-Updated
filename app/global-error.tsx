"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5EFE2",
          color: "#1C1E1B",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ marginBottom: 24, color: "#6C6856" }}>
            The site hit an unexpected error. Please try again, or come back shortly.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "#D4AF37",
              color: "#1B0F05",
              border: "none",
              padding: "12px 24px",
              fontWeight: 600,
              cursor: "pointer",
              borderRadius: 2,
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
