import { HOME } from "@/config/site";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80dvh] place-items-center bg-cream px-5 pt-40 text-center">
      <div>
        <p className="eyebrow text-forest/60">Erro 404</p>
        <h1 className="mt-4 text-5xl text-forest">Não achamos esta página.</h1>
        <p className="mt-4 text-muted">O endereço pode ter mudado. Volte ao início e siga de lá.</p>
        <Button href={HOME} variant="forest" className="mt-8">
          Ir para o início
        </Button>
      </div>
    </section>
  );
}
