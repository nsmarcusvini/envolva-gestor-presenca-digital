import { footer } from "@/content/home";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { TextLink } from "@/components/ui/Button";

/** Rodapé: o slogan em escala de parede fecha a página. */
export function Footer() {
  const year = 2026;
  const { whatsapp, instagram, email } = site.contact;

  return (
    <footer data-theme="dark" className="on-dark relative bg-deep pb-[max(2rem,env(safe-area-inset-bottom))] text-paper">
      <div className="container-x border-t border-paper/12 pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo id="logo-footer" tone="paper" size={40} />
            <p className="mt-6 max-w-[22rem] leading-relaxed text-paper/60">{footer.blurb}</p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="eyebrow text-paper/45">Navegação</p>
              <ul className="mt-5 space-y-3">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <TextLink href={item.href} className="text-paper/80 hover:text-paper">
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-paper/45">Contato</p>
              <ul className="mt-5 space-y-3">
                <li>
                  <TextLink href={whatsapp.href} target="_blank" rel="noopener noreferrer" className="text-paper/80 hover:text-paper">
                    {whatsapp.display}
                  </TextLink>
                </li>
                <li>
                  <TextLink href={instagram.href} target="_blank" rel="noopener noreferrer" className="text-paper/80 hover:text-paper">
                    {instagram.handle}
                  </TextLink>
                </li>
                {email && (
                  <li>
                    <TextLink href={`mailto:${email}`} className="text-paper/80 hover:text-paper">
                      {email}
                    </TextLink>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-paper/45">Legal</p>
              <ul className="mt-5 space-y-3">
                {site.legal.map((item) => (
                  <li key={item.href}>
                    <TextLink href={item.href} className="text-paper/80 hover:text-paper">
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Slogan de parede */}
        <p
          aria-hidden
          data-reveal="fade"
          className="mt-24 select-none whitespace-nowrap text-[clamp(2.2rem,9vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-paper"
        >
          Envolva <span className="font-serif font-normal italic tracking-[-0.03em] text-paper/85">o Seu</span> Negócio
          <span className="ml-[0.03em] inline-block size-[0.16em] rounded-full bg-gold" />
        </p>

        <div className="eyebrow mt-10 flex flex-col gap-3 border-t border-paper/12 pt-6 text-paper/45 sm:flex-row sm:justify-between">
          <p>© {year} {site.name}. Todos os direitos reservados.</p>
          <a href="#top" className="hover:text-paper">
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
