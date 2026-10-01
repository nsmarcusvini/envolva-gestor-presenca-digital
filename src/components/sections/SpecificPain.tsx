"use client";

import { useEffect, useState } from "react";
import { pain } from "@/content/home";
import { Emphasis } from "@/lib/text";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/components/motion/hooks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LeadButton } from "@/components/ui/LeadButton";

/**
 * Sob medida: o processo que trava. Exemplos reais giram em tipografia
 * grande — o visitante reconhece a própria e vai direto ao campo de dor do formulário.
 */
export function SpecificPain() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % pain.examples.length), 2800);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section id="sob-medida" data-theme="dark" className="on-dark section-y relative overflow-hidden bg-deep text-paper">
      {/* órbita decorativa, cortada pela borda — continuidade com o hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[30vw] top-1/2 aspect-square w-[80vw] -translate-y-1/2 rounded-full border border-paper/[0.07]"
      />

      <div className="container-x relative">
        <SectionHeader index={pain.index} eyebrow={pain.eyebrow} title={pain.title} tone="dark" className="max-w-5xl" />

        <div className="mt-[clamp(4rem,9vw,7rem)] grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Dores que giram */}
          <div className="lg:col-span-7">
            <p className="eyebrow text-paper/55">{pain.examplesLabel}</p>
            <div className="relative mt-6 h-[4.4em] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.04em] md:h-[3.3em]">
              {pain.examples.map((ex, j) => (
                <p
                  key={ex}
                  aria-hidden={j !== i}
                  className={cn(
                    "rotator-item absolute inset-x-0 top-0 max-w-[20ch]",
                    j === i ? "translate-y-0 opacity-100" : j === (i - 1 + pain.examples.length) % pain.examples.length ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0",
                  )}
                >
                  {ex}
                </p>
              ))}
            </div>
            {/* indicador de progresso da rotação */}
            <div aria-hidden className="mt-8 flex gap-2">
              {pain.examples.map((ex, j) => (
                <span
                  key={ex}
                  className={cn(
                    "h-px transition-all duration-700 ease-out-expo",
                    j === i ? "w-10 bg-gold" : "w-5 bg-paper/25",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Do processo ao orçamento */}
          <div className="lg:col-span-5">
            <p data-reveal className="text-lg leading-relaxed text-paper/80 md:text-xl">
              <Emphasis text={pain.body} />
            </p>
            <ol className="mt-10 border-t border-paper/12">
              {pain.steps.map((s, j) => (
                <li
                  key={s}
                  data-reveal
                  style={{ "--d": j + 1 } as React.CSSProperties}
                  className="flex items-baseline gap-5 border-b border-paper/12 py-5"
                >
                  <span className="eyebrow text-gold">{String(j + 1).padStart(2, "0")}</span>
                  <span className="text-[1.0625rem]">{s}</span>
                </li>
              ))}
            </ol>
            <div data-reveal style={{ "--d": 4 } as React.CSSProperties} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <LeadButton intent={{ focus: "dor" }} variant="light">
                {pain.cta}
              </LeadButton>
              <span className="eyebrow text-paper/60">{pain.price}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
