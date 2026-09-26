# Envolva AI — landing page

Next.js 16 + Tailwind 4. Direção de arte "Órbita" (ver comentário no topo de `src/app/globals.css`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Planos, preços, recursos, plano destacado | `src/content/plans.ts` |
| Textos de todas as seções | `src/content/home.ts` |
| Serviços da órbita | `src/content/services.ts` |
| Etapas do "Como funciona" | `src/content/steps.ts` |
| Cases, métricas, depoimentos, logos | `src/content/proof.ts` |
| Campos e textos do formulário | `src/content/form.ts` |
| Contatos, navegação, CTAs | `src/content/site.ts` |
| Para onde o formulário envia (Google Forms, Typeform, webhook) | `src/lib/lead.ts` |
| Ordem das seções | `src/app/page.tsx` |

Texto entre `*asteriscos*` vira serifa itálica.

## Pendências

- Confirmar o @ do Instagram (informado como `@envolavaai.en`) — `src/content/site.ts`
- E-mail oficial e domínio (`NEXT_PUBLIC_SITE_URL`)
- Textos de Política de privacidade e Termos (obrigatório antes de publicar — LGPD)
- Ferramenta do formulário (`src/lib/lead.ts`, hoje em modo "preview")
- Logo em vetor oficial (a atual foi reconstruída a partir do PNG de 192 px)
- Cases, métricas e depoimentos reais (`src/content/proof.ts`)
