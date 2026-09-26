import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type FieldShellProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

/** Label mono + campo com fio inferior + mensagem de erro acessível. */
export function FieldShell({ id, label, hint, error, required, className, children }: FieldShellProps) {
  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="eyebrow flex items-baseline justify-between gap-4 text-paper/65">
        <span>
          {label}
          {required && <span aria-hidden className="ml-1 text-gold">*</span>}
        </span>
        {hint && <span className="normal-case tracking-normal text-paper/40">{hint}</span>}
      </label>
      {children}
      <p id={`${id}-error`} role={error ? "alert" : undefined} className="mt-2 min-h-5 text-sm text-error-soft">
        {error}
      </p>
    </div>
  );
}

type Base = { id: string; label: string; hint?: string; error?: string; className?: string };

export function TextField({ id, label, hint, error, className, required, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field-input mt-2"
        {...rest}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  className,
  options,
  placeholder,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder: string }) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <select id={id} name={id} className="field-input mt-2" {...rest}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function TextareaField({
  id,
  label,
  hint,
  error,
  className,
  ...rest
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: React.Ref<HTMLTextAreaElement> }) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <textarea id={id} name={id} rows={4} className="field-input mt-2" {...rest} />
    </FieldShell>
  );
}

/** Grupo de "chips" (rádio ou checkbox) com o visual de pílula. */
export function ChipGroup({
  name,
  legend,
  hint,
  options,
  type,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  hint?: string;
  options: { value: string; label: string }[];
  type: "radio" | "checkbox";
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow flex w-full items-baseline justify-between gap-4 text-paper/65">
        <span>{legend}</span>
        {hint && <span className="normal-case tracking-normal text-paper/40">{hint}</span>}
      </legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value.includes(o.value);
          return (
            <label key={o.value} className="relative cursor-pointer">
              <input
                type={type}
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => {
                  if (type === "radio") onChange([o.value]);
                  else onChange(checked ? value.filter((v) => v !== o.value) : [...value, o.value]);
                }}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex h-10 items-center gap-2 rounded-full px-4 text-[14px] ring-1 ring-inset transition-all duration-400 ease-out-expo",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
                  checked ? "bg-paper text-deep ring-paper" : "text-paper/80 ring-paper/20 hover:ring-paper/50",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 rounded-full bg-gold transition-transform duration-400 ease-out-expo",
                    checked ? "scale-100" : "-ml-3.5 scale-0",
                  )}
                />
                {o.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
