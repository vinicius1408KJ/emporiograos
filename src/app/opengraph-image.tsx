import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagem de compartilhamento provisória. Substituir por arte oficial em /app/opengraph-image.png. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 96, background: "#022b0b", color: "#faf7ee" }}>
        <div style={{ fontSize: 26, letterSpacing: 12, textTransform: "uppercase", color: "#8bcf00" }}>Empório Natural</div>
        <div style={{ fontSize: 112, marginTop: 12 }}>Grãos e Folhas</div>
        <div style={{ fontSize: 34, marginTop: 28, color: "rgba(250,247,238,0.7)", maxWidth: 860 }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
