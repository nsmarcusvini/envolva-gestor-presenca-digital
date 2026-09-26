"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Mobile: CTA sempre à mão depois do hero. Some quando o formulário
 * (ou o rodapé) está na tela, para não competir com ele.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contato");
    let pastHero = false;
    let contactVisible = false;
    const update = () => setVisible(pastHero && !contactVisible);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) pastHero = !e.isIntersecting;
        if (e.target === contact) contactVisible = e.isIntersecting || e.boundingClientRect.top < 0;
      });
      update();
    });
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-transform duration-700 ease-out-expo md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-[140%]",
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="flex items-center gap-2 rounded-full bg-deep/95 p-1.5 text-paper shadow-[0_18px_40px_-12px_rgb(14_29_24/0.55)] backdrop-blur">
        <a
          href={site.cta.primary.href}
          className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-paper text-[15px] font-medium text-deep"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-gold" />
          {site.cta.primary.label}
        </a>
        <a
          href={site.contact.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          className="grid size-12 place-items-center rounded-full ring-1 ring-inset ring-paper/20"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.06.89.9-2.98-.2-.31a8.2 8.2 0 1 1 6.84 3.72Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
