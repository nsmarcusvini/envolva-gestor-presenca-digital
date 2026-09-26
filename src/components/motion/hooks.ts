"use client";

import { useEffect, useState, type RefObject } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

type ProgressMode =
  /** Seção "pinada": 0 quando o topo encosta no topo da tela, 1 quando o fim encosta no fim. */
  | "pinned"
  /** Elemento atravessando a tela: 0 quando entra por baixo (a ~85%), 1 quando chega a ~35%. */
  | "through";

/**
 * Progresso de rolagem (0→1) de um elemento, calculado em rAF.
 * Se `cssVar` for passado, escreve direto no estilo (sem re-render do React).
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { mode = "through", cssVar, onChange }: { mode?: ProgressMode; cssVar?: string; onChange?: (p: number) => void } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (cssVar) el.style.setProperty(cssVar, "1");
      onChange?.(1);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === "pinned") {
        const total = rect.height - vh;
        p = total > 0 ? -rect.top / total : rect.top < 0 ? 1 : 0;
      } else {
        const start = vh * 0.85;
        const end = vh * 0.35;
        p = (start - rect.top) / (start - end + rect.height * 0.6);
      }
      p = Math.min(1, Math.max(0, p));
      if (cssVar) el.style.setProperty(cssVar, p.toFixed(4));
      onChange?.(p);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // onChange é estável nos usos (setState); não depender dele evita re-assinaturas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode, cssVar]);
}
