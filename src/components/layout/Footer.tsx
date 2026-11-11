import Link from "next/link";
import { footer, site, stores } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks, activeSocial } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer id="contato" className="relative overflow-hidden bg-deep text-cream">
      <svg aria-hidden className="pointer-events-none absolute -right-24 -top-10 h-[34rem] w-[34rem] text-lime opacity-[0.07]" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M40 380C120 260 220 140 380 40M40 380c10-90 60-190 150-250M40 380c90-10 200-50 270-150" />
        <path d="M120 300c30-70 80-130 150-170M90 330c60-20 140-60 200-130" />
      </svg>

      <div className="container-site relative">
        <div className="grid gap-12 py-14 md:grid-cols-2 md:py-20 lg:grid-cols-[1.3fr_0.8fr_1.6fr] lg:gap-16">
          <div>
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-cream/70">{footer.about}</p>
            {activeSocial.length > 0 ? (
              <SocialLinks className="-ml-3 mt-5" />
            ) : (
              <p className="mt-5 text-sm text-cream/45">Redes sociais oficiais em breve.</p>
            )}
          </div>

          <nav aria-label="Institucional">
            <h3 className="eyebrow font-sans text-cream/50">Institucional</h3>
            <ul className="mt-4">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-11 items-center text-cream/85 transition hover:text-lime">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow font-sans text-cream/50">Nossas lojas</h3>
            <ul className="mt-5 grid gap-6 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {stores.map((store) => (
                <li key={store.id}>
                  <p className="font-display text-xl leading-tight">{store.shortName}</p>
                  <address className="mt-2 text-sm not-italic leading-relaxed text-cream/65">
                    {store.address || <span className="text-cream/40">Endereço a confirmar</span>}
                    <br />
                    {store.city} — {store.state}
                    <br />
                    {store.phoneDisplay || <span className="text-cream/40">Telefone a confirmar</span>}
                  </address>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream/10 py-6 pb-24 text-sm text-cream/55 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <Link href="/politica-de-privacidade" className="inline-flex min-h-11 items-center transition hover:text-lime md:mr-20">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
