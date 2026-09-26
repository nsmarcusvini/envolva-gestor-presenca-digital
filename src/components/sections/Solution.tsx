"use client";

import { useEffect, useRef, useState } from "react";
import { solution } from "@/content/home";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LogoMark } from "@/components/ui/Logo";
import { useMediaQuery, useReducedMotion } from "@/components/motion/hooks";

/**
 * A solução: o "seu negócio" no centro e os serviços em órbita ao redor.
 * Desktop: a órbita fica fixa (sticky) e gira para trazer ao topo o serviço
 * que está sendo lido na lista ao lado. Mobile: a órbita gira sozinha.
 */
export function Solution() {
  const [active, setActive] = useState(0);
  const rowsRef = useRef<(HTMLLIElement | null)[]>([]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = useReducedMotion();

  // Desktop: serviço ativo = linha que cruza o meio da tela.
  useEffect(() => {
    if (!isDesktop) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    rowsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [isDesktop]);

  // Mobile: gira sozinha (a menos que o usuário peça menos movimento).
  useEffect(() => {
    if (isDesktop || reduced) return;
    const t = setInterval(() => setActive((a) => (a + 1) % services.length), 2600);
    return () => clearInterval(t);
  }, [isDesktop, reduced]);

  const step = 360 / services.length;

  return (
    <section id="servicos" data-theme="dark" className="on-dark section-y relative bg-deep text-paper">
      <div className="container-x">
        <SectionHeader
          index={solution.index}
          eyebrow={solution.eyebrow}
          title={solution.title}
          intro={solution.intro}
          tone="dark"
          className="max-w-6xl"
        />

        <div className="mt-[clamp(4rem,10vw,8rem)] grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Órbita */}
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-[calc(50vh-17rem)]">
              <div
                aria-hidden
                className="orbit-system relative mx-auto [container-type:inline-size] aspect-square w-full max-w-[16.5rem] xs:max-w-[18.5rem] md:max-w-[34rem]"
                style={{ "--orbit-rot": `${-active * step}deg` } as React.CSSProperties}
              >
                {/* anéis */}
                <div className="absolute inset-0 rounded-full border border-paper/15" />
                <div className="absolute inset-[18%] rounded-full border border-dashed border-paper/10" />

                {/* texto circular: "presença digital" é o que conecta tudo */}
                <svg viewBox="0 0 200 200" className="orbit-spin absolute inset-[9%] size-[82%]">
                  <defs>
                    <path id="orbit-text" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
                  </defs>
                  <text className="fill-paper/35 font-mono text-[6.2px] uppercase tracking-[0.3em]">
                    <textPath href="#orbit-text">
                      {solution.orbitRing.repeat(3)}
                    </textPath>
                  </text>
                </svg>

                {/* centro */}
                <div className="absolute inset-[33%] grid place-items-center rounded-full bg-paper/[0.04]">
                  <div className="flex flex-col items-center gap-3">
                    <LogoMark size={52} id="logo-orbit" />
                    <span className="eyebrow text-paper/70">{solution.orbitCenter}</span>
                  </div>
                </div>

                {/* nós */}
                {services.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={s.id}
                      className="absolute left-1/2 top-1/2 size-0"
                      style={{
                        transform: `rotate(calc(${i * step}deg + var(--orbit-rot))) translateY(-50cqw)`,
                      }}
                    >
                      <div
                        className="absolute left-1/2 top-1/2 flex flex-col items-center"
                        style={{ transform: `translate(-50%,-50%) rotate(calc(${-i * step}deg - var(--orbit-rot)))` }}
                      >
                        <span
                          className={cn(
                            "block rounded-full transition-all duration-700 ease-out-expo",
                            isActive ? "dot-pulse relative size-3.5 bg-gold" : "relative size-2 bg-paper/45",
                          )}
                        />
                        <span
                          className={cn(
                            "eyebrow absolute top-6 whitespace-nowrap transition-colors duration-700",
                            isActive ? "text-paper" : "text-paper/45",
                          )}
                        >
                          {s.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Lista de serviços */}
          <ol className="lg:col-span-6 lg:pt-[8vh]">
            {services.map((s, i) => (
              <li
                key={s.id}
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                data-index={i}
                className={cn(
                  "border-t border-paper/12 py-9 transition-opacity duration-700 ease-out-expo lg:py-14",
                  isDesktop && !reduced && i !== active && "lg:opacity-35",
                )}
              >
                <div className="flex items-baseline gap-5">
                  <span className="eyebrow text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-none tracking-[-0.045em]">{s.name}</h3>
                </div>
                <p className="mt-5 max-w-[30rem] text-[1.0625rem] leading-relaxed text-paper/70 md:ml-[3.1rem]">
                  {s.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2 md:ml-[3.1rem]" aria-label={`O que entra em ${s.name}`}>
                  {s.includes.map((inc) => (
                    <li key={inc} className="eyebrow rounded-full border border-paper/15 px-3 py-2 text-paper/70">
                      {inc}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
