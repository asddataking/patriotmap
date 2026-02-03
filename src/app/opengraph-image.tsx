import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = site.siteName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          backgroundImage: "linear-gradient(to bottom right, #f1f5f9, #e2e8f0)",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#1e293b",
            marginBottom: 16,
          }}
        >
          Patriot Map
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#64748b",
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          Discover opt-in businesses in your community
        </div>
      </div>
    ),
    { ...size }
  );
}
