"use client";

import { useEffect, useRef } from "react";

/**
 * O anel que "envolve" o slogan. Desenhado em duas camadas:
 * - trás: anel inteiro, atrás das letras;
 * - frente: só a metade de baixo, por cima das letras — dá a sensação de que
 *   o anel realmente abraça as palavras (efeito Saturno).
 * O ponto dourado percorre a órbita (SMIL); pausado se o usuário pedir menos movimento.
 */
const RING = "M 30 200 A 470 150 0 1 0 970 200 A 470 150 0 1 0 30 200";

export function HeroOrbit({ layer }: { layer: "back" | "front" }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        svg.pauseAnimations();
        svg.setCurrentTime(3.2);
      } else svg.unpauseAnimations();
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 400"
      aria-hidden
      // Mobile: centralizado nas linhas. Desktop: calibrado para abraçar "o Seu Negócio."
      // sem cruzar o subtítulo à direita.
      className="pointer-events-none absolute left-1/2 top-1/2 w-[112%] -translate-x-1/2 -translate-y-1/2 overflow-visible md:left-[-0.5%] md:w-[84%] md:translate-x-0"
    >
      <defs>
        <clipPath id={`orbit-clip-${layer}`}>
          {/* metade de baixo (em coordenadas já rotacionadas) */}
          <rect x="-100" y="200" width="1200" height="400" />
        </clipPath>
      </defs>
      <g transform="rotate(-7 500 200)">
        <path
          id={`orbit-path-${layer}`}
          d={RING}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          className="orbit-draw"
          clipPath={layer === "front" ? `url(#orbit-clip-${layer})` : undefined}
          opacity={layer === "back" ? 0.28 : 0.55}
        />
        {layer === "front" && (
          <g className="orbit-dot">
            <circle r="9" className="fill-gold">
              <animateMotion dur="16s" repeatCount="indefinite" rotate="0" begin="0s">
                <mpath href={`#orbit-path-${layer}`} />
              </animateMotion>
            </circle>
          </g>
        )}
      </g>
    </svg>
  );
}
