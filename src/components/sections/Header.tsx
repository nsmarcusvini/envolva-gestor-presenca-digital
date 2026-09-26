"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Button, TextLink } from "@/components/ui/Button";

/**
 * Header fixo. Transparente no topo; ao rolar ganha fundo translúcido + fio.
 * Sobre seções escuras ([data-theme="dark"]) inverte as cores sozinho.
 * O fio dourado na base é o indicador de progresso da página.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme="dark"]'));
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const probe = 34;
      setOnDark(
        darkSections.some((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= probe && r.bottom >= probe;
        }),
      );
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
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
  }, []);

  // Menu: trava o scroll, Esc fecha, foco entra e volta para o botão.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sheetRef.current?.querySelector<HTMLElement>("a, button");
    const t = setTimeout(() => first?.focus({ preventScroll: true }), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      menuButtonRef.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const dark = onDark && !open;

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Pular para o conteúdo
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ease-out-expo",
          "border-b border-transparent",
          scrolled && !open && "backdrop-blur-xl backdrop-saturate-150",
          scrolled && !open && (dark ? "border-paper/10 bg-deep/75" : "border-ink/[0.07] bg-paper/75"),
          dark || open ? "text-paper" : "text-ink",
        )}
      >
        <div className="container-x relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href="#top" aria-label="Envolva AI — voltar ao início" className="relative z-[70] rounded-lg">
            <Logo id="logo-header" tone={dark || open ? "paper" : "ink"} />
          </a>

          <nav aria-label="Principal" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-9 text-[14px]">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} className={dark ? "text-paper/80 hover:text-paper" : "text-ink/75 hover:text-ink"}>
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-[70] flex items-center gap-2">
            <span className="hidden md:block">
              <Button href={site.cta.primary.href} size="sm" variant={dark ? "light" : "primary"}>
                {site.cta.primary.label}
              </Button>
            </span>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="eyebrow flex h-11 items-center gap-2.5 rounded-full px-3 lg:hidden"
            >
              <span>{open ? "Fechar" : "Menu"}</span>
              <span aria-hidden className="relative block h-2.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                    open && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                    open && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <span
          ref={progressRef}
          aria-hidden
          className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gold"
        />
      </header>

      {/* Menu mobile: abre como um círculo expandindo a partir do botão */}
      <div
        id="menu-mobile"
        ref={sheetRef}
        data-open={open}
        inert={!open}
        aria-hidden={!open}
        className="menu-sheet on-dark fixed inset-0 z-[45] flex flex-col bg-deep text-paper lg:hidden"
      >
        <nav aria-label="Menu" className="container-x flex flex-1 flex-col justify-center pt-[var(--header-h)]">
          <ul className="space-y-1">
            {[...site.nav, { label: "Contato", href: "#contato" }].map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ "--i": i } as React.CSSProperties}
                  className="menu-link flex items-baseline gap-4 py-1.5 text-[clamp(2.5rem,11vw,4rem)] font-semibold leading-none tracking-[-0.045em]"
                >
                  <span className="eyebrow text-paper/45">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x space-y-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <Button href={site.cta.primary.href} variant="light" className="w-full" onClick={() => setOpen(false)}>
            {site.cta.primary.label}
          </Button>
          <div className="eyebrow flex justify-between text-paper/60">
            <a href={site.contact.whatsapp.href} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={site.contact.instagram.href} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
