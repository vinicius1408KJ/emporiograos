import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { site } from "@/config/site";
import { ScrollToTopOnLoad } from "@/components/ui/ScrollToTopOnLoad";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Produtos naturais no Maranhão`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#022b0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* data-scroll-behavior: ao trocar de página o Next desliga o scroll suave e vai direto
     * ao topo. Sem isso, no iPhone a ida ao topo virava animação e parava abaixo do hero. */
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <head>
        <ScrollToTopOnLoad />
      </head>
      <body>{children}</body>
    </html>
  );
}
