"use client";

import { useRef, useState } from "react";
import { how } from "@/content/home";
import { steps } from "@/content/steps";
import { cn } from "@/lib/cn";
import { useScrollProgress } from "@/components/motion/hooks";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Como funciona: seção "pinada" no desktop. Rolar = o ponto dourado percorre
 * a linha do 01 ao 04 e cada etapa acende quando o ponto chega nela.
 * Mobile: linha vertical que se preenche conforme a leitura.
 */
export function HowItWorks() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useScrollProgress(pinRef, { mode: "pinned", onChange: setP });

  const n = steps.length;
  // cada etapa "acende" quando o ponto passa pela sua posição na linha
  const reached = (i: number) => p >= i / n - 0.001;
  // o ponto para um pouco antes do fim, na etapa final
  const dot = Math.min(p * (n / (n - 0.35)), 1);

  return (
    <section id="como-funciona" className="relative">
      {/* Desktop: 300vh de trilho, conteúdo fixo na tela */}
      <div ref={pinRef} className="relative hidden h-[300vh] lg:block motion-reduce:h-auto">
        <div className="sticky top-0 flex h-screen flex-col justify-center motion-reduce:static motion-reduce:h-auto motion-reduce:py-40">
          <div className="container-x">
            <SectionHeader index={how.index} eyebrow={how.eyebrow} title={how.title} />

            <div className="relative mt-24">
              {/* trilho */}
              <div className="relative h-px w-full bg-ink/12">
                <div
                  className="absolute inset-y-0 left-0 w-full origin-left bg-primary"
                  style={{ transform: `scaleX(${dot})` }}
                />
                <span
                  className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
                  style={{ left: `${dot * 100}%` }}
                />
              </div>

              <ol className="mt-14 grid grid-cols-4 gap-10">
                {steps.map((s, i) => (
                  <li
                    key={s.number}
                    className={cn(
                      "transition-[opacity,transform] duration-700 ease-out-expo",
                      reached(i) ? "opacity-100" : "translate-y-3 opacity-30",
                    )}
                  >
                    <span
                      className={cn(
                        "block font-serif text-[clamp(4rem,7vw,6.5rem)] italic leading-[0.8] tracking-[-0.03em] transition-colors duration-700",
                        reached(i) ? "text-primary" : "text-ink/25",
                      )}
                    >
                      {s.number}
                    </span>
                    <h3 className="mt-8 text-3xl font-medium tracking-[-0.035em]">{s.title}</h3>
                    <p className="mt-4 max-w-[17rem] leading-relaxed text-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <MobileSteps />
    </section>
  );
}

function MobileSteps() {
  const listRef = useRef<HTMLOListElement>(null);
  useScrollProgress(listRef, { mode: "through", cssVar: "--p" });

  return (
    <div className="section-y lg:hidden">
      <div className="container-x">
        <SectionHeader index={how.index} eyebrow={how.eyebrow} title={how.title} />
        <ol ref={listRef} className="relative mt-16 space-y-14 pl-12">
          <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-ink/12">
            <span className="absolute inset-0 origin-top scale-y-[var(--p,1)] bg-primary" />
          </span>
          {steps.map((s, i) => (
            <li key={s.number} data-reveal style={{ "--d": i } as React.CSSProperties} className="relative">
              <span aria-hidden className="absolute -left-12 top-3 size-[11px] rounded-full bg-gold ring-4 ring-paper" />
              <span className="block font-serif text-6xl italic leading-none text-primary">{s.number}</span>
              <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em]">{s.title}</h3>
              <p className="mt-3 max-w-[24rem] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
