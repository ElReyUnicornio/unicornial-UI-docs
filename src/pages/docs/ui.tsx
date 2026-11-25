import { useEffect, useState, type ReactNode } from "react";
import { Surface } from "unicornial-ui";

/** Code with a copy button. */
export function CodeBlock({ children, label = "Code" }: { children: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 3000);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="flex min-w-0 items-start rounded-lg border border-border bg-hover">
      <pre tabIndex={0} className="min-w-0 flex-1 overflow-x-auto p-4 pr-1 text-[13px] leading-relaxed">
        <code className="font-mono">{children}</code>
      </pre>
      <button
        type="button"
        onClick={() => void copy()}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="m-2 shrink-0 cursor-pointer rounded-md border border-border bg-bg px-2.5 py-1 text-xs font-medium focus-visible:outline-2 focus-visible:outline-accent"
      >
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Copied to the clipboard." : state === "failed" ? "Couldn't copy. Select the code and copy it by hand." : ""}
      </span>
    </div>
  );
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col gap-3">
      <h2 className="mt-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function Text({ children }: { children: ReactNode }) {
  return <p className="max-w-[70ch] text-[15px] leading-7">{children}</p>;
}

export function C({ children }: { children: ReactNode }) {
  return <code className="rounded bg-hover px-1.5 py-0.5 font-mono text-[0.88em]">{children}</code>;
}

/** Reference table; the first column is rendered as code. Wide ones scroll sideways on narrow screens. */
export function Table({
  label,
  head,
  rows,
  plain = false,
}: {
  label: string;
  head: string[];
  rows: ReactNode[][];
  /** The first column isn't code. */
  plain?: boolean;
}) {
  return (
    <div role="region" aria-label={label} tabIndex={0} className="min-w-0 overflow-x-auto rounded-lg border border-border">
      <table className={`w-full border-collapse text-left text-sm ${head.length > 2 ? "min-w-[34rem]" : ""}`}>
        <thead>
          <tr className="bg-hover">
            {head.map((cell) => (
              <th key={cell} scope="col" className="px-3 py-2 font-semibold">{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border align-top">
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2 leading-6 ${j > 0 ? "" : plain ? "font-medium" : "break-words font-mono text-[13px] max-sm:max-w-[11rem]"}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// live demo helpers ---------------------------------------------------------------------------------

export function Card({
  title,
  description,
  look,
  code,
  className = "",
  children,
}: {
  title: string;
  description?: string;
  look?: string;
  /** Usage snippet, shown in a collapsible block. */
  code?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Surface themeVariant={look} className={`flex min-w-0 flex-col gap-3 ${className}`}>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="text-sm opacity-70">{description}</p>}
      </div>
      {children}
      {code && (
        <details className="min-w-0 text-sm">
          <summary className="cursor-pointer select-none opacity-70 hover:opacity-100">Code</summary>
          <div className="mt-2">
            <CodeBlock label={`${title} code`}>{code}</CodeBlock>
          </div>
        </details>
      )}
    </Surface>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function Grid({ children }: { children: ReactNode }) {
  // Columns follow the width of the nearest @container, so a demo also fits half a page.
  return <div className="grid gap-4 grid-cols-1 @3xl:grid-cols-2 items-start">{children}</div>;
}

export interface DemoProps {
  look?: string;
}
