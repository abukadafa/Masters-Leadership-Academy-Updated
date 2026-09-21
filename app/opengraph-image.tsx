import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Masters Leadership Academy — Leadership Training, Conferences & Technical Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B192C",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #D4AF37",
              borderRadius: 6,
              color: "#D4AF37",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#E6C55F",
              fontFamily: "monospace",
            }}
          >
            Masters Leadership Academy
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              lineHeight: 1.15,
              color: "#F5EFE2",
              maxWidth: 900,
            }}
          >
            Leadership Training, Conferences &amp; Technical Services
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#9AACA6",
            }}
          >
            Port Harcourt, Rivers State, Nigeria
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
