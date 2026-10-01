import { hero } from "@/content/home";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { HeroOrbit } from "./HeroOrbit";

/**
 * Hero: o slogan é a imagem. Três linhas desalinhadas de propósito
 * (grotesca → serifa itálica → grotesca), com a órbita envolvendo "o Seu Negócio".
 * O ponto final do slogan é o ponto da marca.
 */
const line = "block overflow-clip [overflow-clip-margin:0.14em]";
const word = (i: number) => ({ "--i": i } as React.CSSProperties);

export function Hero() {
  const { line1, line2, line3 } = hero.headline;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-x-clip pb-8 pt-[calc(var(--header-h)+1.75rem)] md:pb-10"
    >
      <div className="container-x flex flex-1 flex-col">
        {/* Linha de metadados, estilo ficha técnica */}
        <div
          data-reveal="fade"
          className="flex items-start justify-between gap-6 border-t border-ink/10 pt-4 text-muted"
        >
          <Eyebrow index="01">{hero.eyebrow}</Eyebrow>
          <p className="eyebrow hidden gap-5 md:flex">
            {hero.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>
        </div>

        <div className="relative flex flex-1 flex-col justify-center py-10 md:py-8">
          <h1
            data-reveal="split"
            aria-label={site.slogan}
            className="relative isolate font-semibold leading-[0.84] tracking-[-0.058em] text-[clamp(4.1rem,min(20.5vw,24svh),15.5rem)] md:text-[clamp(4.1rem,min(15.5vw,24svh),15.5rem)]"
          >
            <span aria-hidden className={line}>
              <span className="split-word">
                <span style={word(0)}>{line1}</span>
              </span>
            </span>

            <span aria-hidden className="relative block">
              {/* órbita atrás das letras */}
              <span className="absolute inset-0 -z-10 text-ink">
                <HeroOrbit layer="back" />
              </span>

              <span className={`${line} relative pl-[16%] md:pl-[34%]`}>
                <span className="split-word">
                  <span style={word(1)} className="font-serif font-normal italic tracking-[-0.03em]">
                    {line2}
                  </span>
                </span>
              </span>
              <span className={`${line} relative pl-[4%] md:pl-[11%]`}>
                <span className="split-word">
                  <span style={word(2)}>
                    {line3}
                    <span className="ml-[0.04em] inline-block size-[0.17em] rounded-full bg-gold align-baseline" />
                  </span>
                </span>
              </span>

              {/* órbita na frente (metade de baixo) + ponto viajante */}
              <span className="absolute inset-0 z-10 text-ink">
                <HeroOrbit layer="front" />
              </span>
            </span>
          </h1>

          {/* Subtítulo: à direita da primeira linha no desktop, como uma nota de margem */}
          <p
            data-reveal
            style={{ "--d": 6 } as React.CSSProperties}
            className="mt-10 max-w-[26rem] text-[1.0625rem] leading-relaxed text-muted md:text-lg lg:absolute lg:right-0 lg:top-[14%] lg:mt-0 lg:max-w-[21rem] xl:max-w-[23rem]"
          >
            {hero.sub}
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div
            data-reveal
            style={{ "--d": 7 } as React.CSSProperties}
            className="flex flex-col gap-3 xs:flex-row xs:flex-wrap"
          >
            <Button href={site.cta.primary.href}>{site.cta.primary.label}</Button>
            <Button href={site.cta.secondary.href} variant="outline">
              {site.cta.secondary.label}
            </Button>
          </div>
          <a
            href="#cenario"
            data-reveal="fade"
            style={{ "--d": 9 } as React.CSSProperties}
            className="eyebrow group hidden items-center gap-3 text-muted md:flex"
          >
            {hero.scrollHint}
            <span className="relative block h-9 w-px overflow-hidden bg-ink/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_2.2s_var(--ease-in-out-quint)_infinite] bg-ink" />
            </span>
          </a>
        </div>
      </div>
      <style>{`@keyframes scroll-hint{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
