import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/whatsapp/WhatsAppFloat";
import { WhatsAppProvider } from "@/components/whatsapp/WhatsAppProvider";

/** Casca do site institucional: header, footer e WhatsApp flutuante. A rota "/" fica de fora. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <WhatsAppProvider>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </WhatsAppProvider>
  );
}
