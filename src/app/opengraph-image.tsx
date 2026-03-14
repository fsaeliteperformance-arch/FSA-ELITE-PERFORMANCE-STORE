import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
          padding: "72px",
          background: "radial-gradient(circle at 20% 20%, #2b2b45, #0f1025 55%)",
          color: "#ffffff",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#e3e6f0",
            fontWeight: 700,
          }}
        >
          FSA Elite Performance
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Official Store
          <br />
          for Elite Sellers
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 32,
            color: "#c7cbe3",
            maxWidth: "820px",
          }}
        >
          Branded apparel, sales tools, and professional gear built to showcase
          your personal brand.
        </p>
        <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 22px",
            borderRadius: 9999,
            backgroundColor: "rgba(233, 69, 96, 0.16)",
          color: "#f76b86",
          fontWeight: 700,
          fontSize: 26,
        }}
        >
          <span>🚀 Fast shipping. Built for closers.</span>
        </div>
      </div>
    ),
    size,
  );
}
