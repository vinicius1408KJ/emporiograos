import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  alternates: { canonical: "/politica-de-privacidade" },
};

/**
 * MODELO — precisa de revisão jurídica e dos dados oficiais da empresa
 * (razão social, CNPJ e e-mail do encarregado) antes de publicar.
 */
const sections = [
  { title: "Quais dados coletamos", text: "Este site não tem formulários e não coleta dados pessoais. Quando você fala com uma unidade pelo WhatsApp, a conversa acontece no aplicativo e segue a política do próprio WhatsApp." },
  { title: "Para que usamos", text: "Os dados que você compartilha com a gente pelo WhatsApp são usados somente para o seu atendimento. Não vendemos nem compartilhamos seus dados com terceiros para fins de publicidade." },
  { title: "Seus direitos", text: "Você pode pedir a qualquer momento a confirmação, correção ou exclusão dos seus dados, como prevê a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)." },
  { title: "Como falar com a gente", text: "Para qualquer pedido sobre seus dados, procure uma das nossas unidades pelos canais oficiais indicados neste site." },
];

export default function PrivacyPage() {
  return (
    <article className="bg-cream pb-24 pt-40 md:pt-48">
      <div className="container-site max-w-3xl">
        <p className="eyebrow text-forest/60">Institucional</p>
        <h1 className="mt-4 text-5xl text-forest">Política de privacidade</h1>
        <p className="mt-6 text-lg text-muted">Como o {site.name} cuida das informações de quem visita este site.</p>
        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl text-forest">{s.title}</h2>
              <p className="mt-3 text-muted">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
