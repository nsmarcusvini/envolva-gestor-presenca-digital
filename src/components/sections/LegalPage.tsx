import { Logo } from "@/components/ui/Logo";
import { TextLink } from "@/components/ui/Button";

/** Página legal simples. O texto oficial ainda precisa ser fornecido. */
export function LegalPage({ title }: { title: string }) {
  return (
    <main className="container-x min-h-screen py-10">
      <a href="/" aria-label="Envolva AI — voltar para a página inicial">
        <Logo id="logo-legal" />
      </a>
      <h1 className="display mt-24 text-[clamp(2.6rem,6vw,5rem)]">{title}</h1>
      <div className="mt-12 max-w-2xl rounded-2xl border border-dashed border-ink/25 bg-surface-soft/50 p-6">
        <p className="eyebrow text-support">Texto pendente</p>
        <p className="mt-3 text-muted">
          O conteúdo oficial desta página ainda precisa ser fornecido pela Envolva AI. Como o formulário coleta
          dados pessoais, a política de privacidade deve estar publicada antes de a página ir ao ar (LGPD).
        </p>
      </div>
      <p className="mt-12">
        <TextLink href="/" arrow>
          Voltar para a página inicial
        </TextLink>
      </p>
    </main>
  );
}
