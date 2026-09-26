"use client";

import { useRef, useState } from "react";
import { problem } from "@/content/home";
import { cn } from "@/lib/cn";
import { useScrollProgress } from "@/components/motion/hooks";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";

/**
 * O problema, em dois tempos:
 * 1) um parágrafo que "acende" palavra por palavra conforme a rolagem;
 * 2) um checklist em que o visitante marca o que acontece com ele — e percebe
 *    que a Envolva cuida de todos os itens.
 */
export function Problem() {
  const scrubRef = useRef<HTMLParagraphElement>(null);
  useScrollProgress(scrubRef, { mode: "through", cssVar: "--p" });

  const words = problem.scrub.split(" ");
  const [checked, setChecked] = useState<boolean[]>(() => problem.items.map(() => false));
  const count = checked.filter(Boolean).length;

  return (
    <section id="cenario" className="section-y relative">
      <div className="container-x">
        <Eyebrow index={problem.index} className="text-muted">
          {problem.eyebrow}
        </Eyebrow>

        <p
          ref={scrubRef}
          aria-label={problem.scrub}
          style={{ "--n": words.length } as React.CSSProperties}
          className="mt-10 max-w-[19ch] text-[clamp(2rem,5.4vw,5rem)] font-medium leading-[1.04] tracking-[-0.04em] md:max-w-[22ch]"
        >
          {words.map((w, i) => (
            <span key={i} aria-hidden className="scrub-word" style={{ "--i": i } as React.CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-[clamp(5rem,12vw,10rem)] grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Contador fixo ao lado da lista */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h3 data-reveal className="max-w-[16ch] text-2xl font-medium leading-tight tracking-[-0.03em] md:text-3xl">
                {problem.checklistTitle}
              </h3>
              <div data-reveal style={{ "--d": 2 } as React.CSSProperties} className="mt-10 flex items-end gap-4" aria-live="polite">
                <p className="font-serif text-[clamp(4.5rem,9vw,7.5rem)] italic leading-[0.8] tracking-[-0.03em] text-primary">
                  <span className="sr-only">Você marcou </span>
                  <span className="tabular-nums">{count}</span>
                  <span className="text-ink/25">/{problem.items.length}</span>
                </p>
                <p className="eyebrow pb-2 text-muted">{problem.counterLabel}</p>
              </div>
              <p
                className={cn(
                  "mt-6 max-w-[22rem] text-muted transition-opacity duration-700 ease-out-expo",
                  count === 0 && "lg:opacity-0",
                )}
              >
                {problem.counterNote}{" "}
                <TextLink href={problem.cta.href} arrow className="font-medium text-ink">
                  {problem.cta.label}
                </TextLink>
              </p>
            </div>
          </div>

          <ul className="border-t border-ink/10 lg:col-span-8">
            {problem.items.map((item, i) => (
              <li key={item.title} data-reveal style={{ "--d": i % 4 } as React.CSSProperties}>
                <label
                  className={cn(
                    "group grid cursor-pointer grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 border-b border-ink/10 py-6 transition-colors duration-500 ease-out-expo md:grid-cols-[3.5rem_1fr_auto] md:py-8",
                    "has-[:focus-visible]:bg-surface-soft/60",
                  )}
                >
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked[i]}
                    onChange={() => setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                  />
                  <span className="eyebrow self-start pt-2 text-muted md:pt-3">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span
                      className={cn(
                        "block text-[clamp(1.4rem,2.8vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.035em] transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-1.5",
                        checked[i] && "text-primary",
                      )}
                    >
                      {item.title}
                    </span>
                    <span className="mt-2 block text-[15px] leading-snug text-muted md:text-base">{item.detail}</span>
                  </span>
                  {/* marcador: círculo que vira o ponto da marca */}
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-9 place-items-center rounded-full ring-1 ring-inset transition-all duration-500 ease-out-expo md:size-11",
                      checked[i] ? "bg-primary ring-primary" : "ring-ink/20 group-hover:ring-ink/50",
                      "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-support",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2.5 rounded-full bg-gold transition-transform duration-500 ease-out-expo",
                        checked[i] ? "scale-100" : "scale-0",
                      )}
                    />
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
