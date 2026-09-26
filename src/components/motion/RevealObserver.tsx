"use client";

import { useEffect } from "react";

/**
 * Um único IntersectionObserver para a página inteira: marca com [data-in] todo
 * elemento com [data-reveal] quando ele entra na tela. O CSS faz o resto.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    // O que já está na tela ao carregar (ex.: o hero inteiro) entra de imediato.
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.setAttribute("data-in", "");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
