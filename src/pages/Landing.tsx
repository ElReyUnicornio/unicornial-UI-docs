import { useEffect, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import {
  Button,
  Footer,
  Form,
  Header,
  Input,
  Switch,
  UnicornialInput,
  UnicornialPassword,
  Validate,
  Wireframe,
  showAlert,
  showDrawer,
  showModal,
  showToast,
  useTheme,
} from "unicornial-ui";

const ACCENT = "#7642ef";
const README = "https://github.com/ElReyUnicornio/unicornial-ui#readme";
const REPO = "https://github.com/ElReyUnicornio/unicornial-ui";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

type Palette = ReturnType<typeof palette>;

function palette(dark: boolean) {
  return {
    dark,
    ink: dark ? "#F4F2FF" : "#14121F",
    body: dark ? "#C9C3E6" : "#3B3850",
    muted: dark ? "#A9A3C6" : "#4B4860",
    link: dark ? "#C4B5FD" : "#5B21B6",
    accentText: dark ? "#C4B5FD" : ACCENT,
    glass: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
    glassStrong: dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.75)",
    edge: dark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.9)",
    chip: dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)",
    grid: dark ? "rgba(196,181,253,0.08)" : "rgba(91,33,182,0.07)",
    shadow: dark ? "rgba(0,0,0,0.5)" : "rgba(76,48,170,0.4)",
    page: dark ? "#0F0C1B" : "#F3F1FB",
    pageImage: dark
      ? "radial-gradient(900px 600px at 8% 0%, rgba(56,120,160,0.35), transparent 70%), radial-gradient(800px 700px at 95% 10%, rgba(120,60,170,0.35), transparent 70%), radial-gradient(1000px 700px at 85% 95%, rgba(60,50,150,0.4), transparent 70%)"
      : "radial-gradient(900px 600px at 8% 0%, #C9EEFF 0%, rgba(201,238,255,0) 70%), radial-gradient(800px 700px at 95% 10%, #F3D3FB 0%, rgba(243,211,251,0) 70%), radial-gradient(1000px 800px at 60% 45%, #DCD8FF 0%, rgba(220,216,255,0) 70%), radial-gradient(900px 700px at 10% 75%, #D6F0FF 0%, rgba(214,240,255,0) 70%), radial-gradient(1000px 700px at 85% 95%, #C9C3FF 0%, rgba(201,195,255,0) 70%)",
  };
}

const glassBox = (p: Palette, radius = 22): CSSProperties => ({
  background: p.glass,
  border: `1px solid ${p.edge}`,
  borderRadius: radius,
});

const h2Style: CSSProperties = {
  margin: 0,
  fontWeight: 800,
  fontSize: "clamp(32px, 4.5vw, 52px)",
  lineHeight: 1.05,
  letterSpacing: "-0.04em",
  textWrap: "balance",
};

function SectionHead({ p, title, text }: { p: Palette; title: string; text?: string }) {
  return (
    <div className="flex flex-col gap-3.5 max-w-3xl">
      <h2 style={h2Style}>{title}</h2>
      {text && <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: p.body }}>{text}</p>}
    </div>
  );
}

function Cursor({
  name,
  color,
  className = "",
}: {
  name: string;
  color: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute flex items-start gap-0.5 pointer-events-none ${className}`}
    >
      <svg width="16" height="18" viewBox="0 0 16 18">
        <path
          d="M1 1l13 7-6 1.5L5 16z"
          fill={color}
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          marginTop: 12,
          padding: "3px 8px",
          borderRadius: 999,
          background: color,
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {name}
      </span>
    </span>
  );
}

function Handles({ color, inset = 5 }: { color: string; inset?: number }) {
  const base: CSSProperties = {
    position: "absolute",
    width: 8,
    height: 8,
    background: "#fff",
    border: `1.5px solid ${color}`,
  };
  return (
    <>
      <span aria-hidden="true" style={{ ...base, left: -inset, top: -inset }} />
      <span aria-hidden="true" style={{ ...base, right: -inset, top: -inset }} />
      <span aria-hidden="true" style={{ ...base, left: -inset, bottom: -inset }} />
      <span aria-hidden="true" style={{ ...base, right: -inset, bottom: -inset }} />
    </>
  );
}

// nav ------------------------------------------------------------------------------------------------

function ThemeToggle({ p, setDark }: { p: Palette; setDark: (v: boolean) => void }) {
  const label = p.dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setDark(!p.dark)}
      className="flex items-center justify-center rounded-full cursor-pointer hover:bg-hover"
      style={{ width: 44, height: 44, border: 0, color: p.ink }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {p.dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </>
        ) : (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        )}
      </svg>
    </button>
  );
}

function Nav({ p, setDark }: { p: Palette; setDark: (v: boolean) => void }) {
  // the landing draws its own focus outline (index.css), so drop the library's ring
  const noRing = "focus-visible:ring-0 focus-visible:ring-offset-0";
  return (
    <Header
      themeVariant="glass"
      className="z-10 justify-between gap-2 pl-3 pr-2 sm:pl-4 sm:pr-2 md:pl-6"
      // same edges as .wrap; the glass look positions the bar itself, so override left and width
      style={{ left: "max(24px, 50% - 600px)", width: "min(1200px, 100% - 48px)" }}
    >
      {/* Header.Logo only takes classes for the image, so the title is sized from here */}
      <a
        href="#top"
        className="flex min-w-0 no-underline [&_span]:tracking-tight sm:[&_span]:text-xl max-[359px]:[&_span]:sr-only"
        style={{ color: p.ink }}
      >
        <Header.Logo src={Logo} alt="" title="Unicornial UI" style={{ height: 40 }} />
      </a>
      <nav aria-label="Main" className="flex items-center gap-1">
        <Header.NavButton
          as={Link}
          to="/docs"
          className={noRing}
          style={{
            height: 44,
            padding: "0 18px",
            borderRadius: 999,
            background: ACCENT,
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Docs
        </Header.NavButton>
        <Header.NavButton
          href={REPO}
          aria-label="Unicornial UI on GitHub"
          className={`max-sm:hidden ${noRing}`}
          style={{ width: 44, height: 44, padding: 0, color: p.ink }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
          </svg>
        </Header.NavButton>
        <ThemeToggle p={p} setDark={setDark} />
      </nav>
    </Header>
  );
}

// hero -----------------------------------------------------------------------------------------------

const commands = {
  npm: "npm i unicornial-ui",
  pnpm: "pnpm add unicornial-ui",
  yarn: "yarn add unicornial-ui",
};
type Pm = keyof typeof commands;

function InstallBox({ p }: { p: Palette }) {
  const [pm, setPm] = useState<Pm>("npm");
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
  const order = Object.keys(commands) as Pm[];
  const pill: CSSProperties = {
    minHeight: 36,
    border: 0,
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 12,
    fontFamily: MONO,
    padding: "0 12px",
  };

  useEffect(() => {
    if (copy === "idle") return;
    const timer = setTimeout(() => setCopy("idle"), 4000);
    return () => clearTimeout(timer);
  }, [copy]);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(commands[pm]);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  };

  return (
    <div
      className="flex flex-col gap-1 w-full sm:w-auto"
      style={{
        padding: 8,
        borderRadius: 22,
        background: p.glassStrong,
        border: `1px solid ${p.edge}`,
        fontFamily: MONO,
        fontSize: 14,
      }}
    >
      <div role="group" aria-label="Package manager" className="flex gap-1">
        {order.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={pm === name}
            onClick={() => {
              setPm(name);
              setCopy("idle");
            }}
            style={{
              ...pill,
              background: pm === name ? "rgba(127,127,160,0.2)" : "transparent",
              color: p.body,
            }}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
        <code
          className="min-w-0 overflow-x-auto whitespace-nowrap"
          style={{ color: p.ink, paddingLeft: 12 }}
        >
          <span style={{ color: p.muted }}>$ </span>
          {commands[pm]}
        </code>
        <button
          type="button"
          aria-label={copy === "copied" ? "Copied" : "Copy install command"}
          onClick={() => void copyCommand()}
          style={{
            ...pill,
            minHeight: 44,
            background: "transparent",
            fontWeight: 600,
            color: p.link,
          }}
        >
          {copy === "copied" ? "Copied" : "Copy"}
        </button>
      </div>
      <span
        role="status"
        className={copy === "failed" ? "px-3 pb-1 text-xs" : "sr-only"}
        style={{ color: p.ink }}
      >
        {copy === "copied"
          ? "Install command copied."
          : copy === "failed"
            ? "Couldn't copy. Select the command and copy it by hand."
            : ""}
      </span>
    </div>
  );
}

function Hero({ p }: { p: Palette }) {
  const stage = (dark: boolean): CSSProperties => ({
    padding: 22,
    ...glassBox(p),
    ...(dark
      ? {
          background: "rgba(22,16,44,0.88)",
          borderColor: "rgba(255,255,255,0.12)",
          boxShadow: "0 20px 50px -26px rgba(40,20,100,0.7)",
        }
      : {}),
  });
  return (
    <section
      id="top"
      style={{
        backgroundImage: `linear-gradient(${p.grid} 1px, transparent 1px), linear-gradient(90deg, ${p.grid} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        backgroundPosition: "center top",
      }}
    >
      <div className="wrap flex flex-col gap-14 pt-33 md:pt-39 pb-14 md:pb-16">
        <div className="flex flex-col gap-6" style={{ maxWidth: 920 }}>
          <span
            className="inline-flex self-start items-center gap-2"
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: p.glassStrong,
              border: `1px solid ${p.edge}`,
              fontFamily: MONO,
              fontSize: 12,
              color: p.muted,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 0v12M9 0v12M0 3h12M0 9h12" stroke={p.link} strokeWidth="1" />
            </svg>
            v1.1.1 · open source · Apache 2.0
          </span>
          <h1
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: "clamp(44px, 7vw, 88px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              textWrap: "balance",
            }}
          >
            Every component you need.
            <br />
            <span
              className="relative inline-block"
              style={{
                marginTop: 10,
                padding: "0 8px",
                outline: `1.5px solid ${ACCENT}`,
                color: p.accentText,
              }}
            >
              None of the weight.
              <Handles color={ACCENT} />
            </span>
          </h1>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 19,
              lineHeight: 1.6,
              color: p.body,
              maxWidth: "36em",
            }}
          >
            Unicornial UI is a lightweight, open-source React library with buttons, forms, controls,
            alerts, overlays and navigation in one package. Open a modal, confirm dialog or toast
            with one function call, even from code outside React.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={README}
              className="inline-flex items-center gap-2"
              style={{
                padding: "0 24px",
                height: 50,
                borderRadius: 999,
                background: ACCENT,
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 16,
                boxShadow: `0 12px 30px -14px ${ACCENT}`,
              }}
            >
              Quick start
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <InstallBox p={p} />
          </div>
        </div>

        {/* wireframe -> design -> code */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-3.5 min-w-0" style={stage(false)}>
            <span style={{ fontFamily: MONO, fontSize: 12, color: p.muted }}>01 — Wireframe</span>
            <Wireframe className="flex-1" style={{ minHeight: 210 }}>
              <Wireframe.Block shape="text" width="40%" height={14} />
              <Wireframe.Block shape="text" width="22%" className="mt-1" />
              <Wireframe.Block />
              <Wireframe.Block shape="text" width="28%" />
              <Wireframe.Block />
              <Wireframe.Row>
                <Wireframe.Block tone="fill" width={88} height={36} />
                <Wireframe.Block width={72} height={36} />
              </Wireframe.Row>
            </Wireframe>
          </div>

          <div className="flex flex-col gap-3.5 min-w-0" style={stage(false)}>
            <span style={{ fontFamily: MONO, fontSize: 12, color: p.muted }}>
              02 — Try the live form
            </span>
            <div
              className="relative flex flex-col"
              style={{
                padding: 20,
                minHeight: 210,
                background: p.glassStrong,
                border: `1px solid ${p.edge}`,
                borderRadius: 18,
                boxShadow: `0 14px 40px -24px ${p.shadow}`,
              }}
            >
              <HeroForm />
              <Cursor name="Ana" color="#BE185D" className="right-6 -bottom-4" />
            </div>
          </div>

          <div
            className="flex flex-col gap-3.5 min-w-0 md:col-span-2 lg:col-span-1"
            style={stage(true)}
          >
            <span style={{ fontFamily: MONO, fontSize: 12, color: "#B9B3D6" }}>
              03 — The code behind it
            </span>
            <pre
              style={{
                margin: 0,
                minHeight: 210,
                overflowX: "auto",
                fontFamily: MONO,
                fontSize: 12.5,
                lineHeight: 1.75,
                whiteSpace: "pre-wrap",
                color: "#ECEAF6",
              }}
            >
              <Code>{heroCode}</Code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

const heroCode = `import { ThemeProvider, Form,
  Button, Validate,
  UnicornialInput, UnicornialPassword
} from 'unicornial-ui'

<ThemeProvider>
  <Form initialValues={{}}
    onSubmit={save}>
    <UnicornialInput name="email"
      label="Email" themeVariant="glass"
      validator={Validate.regex(
        /^\\S+@\\S+\\.\\S+$/,
        "Use the format name@site.com")} />
    <UnicornialPassword name="password"
      label="Password" themeVariant="glass"
      validator={Validate.regex(
        /^.{6,}$/,
        "Use at least 6 characters")} />
    <Button type="submit"
      themeVariant="glass">
      Check fields
    </Button>
  </Form>
</ThemeProvider>`;

/** The form from the code panel, running. Custom messages keep the demo in English. */
function HeroForm() {
  return (
    <Form
      initialValues={{}}
      onSubmit={(_values, hasErrors) =>
        hasErrors
          ? showToast("Check the highlighted fields.", "error", undefined, undefined, "glass")
          : showToast(
              "Both fields are valid. This demo sends nothing.",
              "success",
              undefined,
              undefined,
              "glass",
            )
      }
    >
      <div className="flex flex-col gap-3">
        <UnicornialInput
          name="email"
          label="Email"
          placeholder="you@example.com"
          themeVariant="glass"
          validator={Validate.regex(/^\S+@\S+\.\S+$/, "Use the format name@site.com")}
        />
        <UnicornialPassword
          name="password"
          label="Password"
          placeholder="At least 6 characters"
          themeVariant="glass"
          validator={Validate.regex(/^.{6,}$/, "Use at least 6 characters")}
        />
        <div>
          <Button size="sm" themeVariant="glass" type="submit">
            Check fields
          </Button>
        </div>
      </div>
    </Form>
  );
}

/** Minimal syntax tint for the dark code panels. */
function Code({ children }: { children: string }) {
  const parts = children.split(
    /(\bimport\b|\bfrom\b|'[^']*'|"[^"]*"|<\/?[A-Z][A-Za-z]*|\b(?:label|type|variant|name|validator|themeVariant)(?==))/g,
  );
  return (
    <>
      {parts.map((part, i) => {
        let color: string | undefined;
        if (/^(import|from)$/.test(part)) color = "#D8B4FE";
        else if (/^['"]/.test(part)) color = "#A5F3C9";
        else if (/^<\/?[A-Z]/.test(part)) color = "#FDE68A";
        else if (/^(label|type|variant|name|validator|themeVariant)$/.test(part)) color = "#A5D8FF";
        return color ? (
          <span key={i} style={{ color }}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}

// stats ----------------------------------------------------------------------------------------------

function Stats({ p }: { p: Palette }) {
  const stats = [
    // 1.1.1: 26.4 kB of JS + 6.2 kB of CSS; measure again when the version changes
    ["33 kB", "whole library, JS + CSS, gzipped"],
    ["2", "built-in looks, each in light and dark"],
    ["0", "runtime dependencies"],
    ["Apache 2.0", "open source license"],
  ];
  return (
    <section aria-label="At a glance" className="wrap">
      <div className="grid grid-cols-2 overflow-hidden lg:grid-cols-4" style={glassBox(p)}>
        {stats.map(([value, label]) => (
          <div key={label} className="flex flex-col gap-1 p-5 md:px-7 md:py-6">
            <span
              style={{
                fontWeight: 800,
                fontSize: "clamp(22px, 3.2vw, 36px)",
                letterSpacing: "-0.03em",
              }}
            >
              {value}
            </span>
            <span style={{ fontSize: 14, color: p.muted }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// playground -----------------------------------------------------------------------------------------

const variants = ["primary", "secondary", "outline", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;
const looks = ["default", "glass"] as const;

function Segmented<T extends string>({
  label,
  options,
  value,
  onPick,
  cols,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onPick: (v: T) => void;
  cols?: number;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-2">
      <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.75 }}>{label}</span>
      <div
        className={cols ? "grid gap-1" : "flex gap-1"}
        style={{
          padding: 4,
          background: "rgba(127,127,160,0.14)",
          borderRadius: 14,
          ...(cols ? { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` } : {}),
        }}
      >
        {options.map((o) => {
          const on = o === value;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(o)}
              style={{
                flex: 1,
                minHeight: 44,
                padding: "0 10px",
                border: 0,
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                background: on ? ACCENT : "transparent",
                color: on ? "#fff" : "inherit",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Playground({ p, setDark }: { p: Palette; setDark: (v: boolean) => void }) {
  const [variant, setVariant] = useState<(typeof variants)[number]>("primary");
  const [size, setSize] = useState<(typeof sizes)[number]>("md");
  const [look, setLook] = useState<(typeof looks)[number]>("glass");
  const glass = look === "glass";
  const dark = p.dark;
  const themeVariant = glass ? "glass" : undefined;

  const stageBg = glass
    ? dark
      ? "radial-gradient(400px 260px at 10% 0%, rgba(56,120,160,0.55), transparent 70%), radial-gradient(400px 260px at 100% 10%, rgba(120,60,170,0.55), transparent 70%), radial-gradient(500px 300px at 60% 110%, rgba(60,50,150,0.6), transparent 70%), #120E22"
      : "radial-gradient(400px 260px at 10% 0%, #C9EEFF, transparent 70%), radial-gradient(400px 260px at 100% 10%, #F3D3FB, transparent 70%), radial-gradient(500px 300px at 60% 110%, #C9C3FF, transparent 70%), #EEEBFB"
    : dark
      ? "#121019"
      : "#FFFFFF";

  return (
    <section id="playground" className="wrap section flex flex-col gap-10">
      <SectionHead
        p={p}
        title="Change a prop and see its code"
        text="Pick a variant, size and look. The button and its code update together. Dark mode changes the whole page, not the code."
      />
      <div
        className="flex flex-wrap overflow-hidden"
        style={{ ...glassBox(p, 26), boxShadow: `0 20px 60px -34px ${p.shadow}` }}
      >
        <div className="flex flex-col min-w-0" style={{ flex: "999 1 min(540px, 100%)" }}>
          <div
            className="relative flex flex-1 items-center justify-center"
            style={{ minHeight: 360, padding: "72px 28px", background: stageBg }}
          >
            <span
              className="absolute"
              style={{
                left: 22,
                top: 18,
                fontFamily: MONO,
                fontSize: 12,
                color: dark ? "#C9C3E6" : "#4B4860",
              }}
            >
              Look: {look} · {dark ? "dark" : "light"}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-16">
              {variants.map((v) => {
                const selected = v === variant;
                return (
                  <div key={v} className="relative inline-flex">
                    <Button
                      type="button"
                      variant={v}
                      size={size}
                      themeVariant={themeVariant}
                      onClick={() => setVariant(v)}
                    >
                      {v}
                    </Button>
                    {selected && (
                      <>
                        <span
                          aria-hidden="true"
                          className="absolute pointer-events-none"
                          style={{ inset: -7, outline: "1.5px solid #A855F7" }}
                        />
                        <Handles color="#A855F7" inset={11} />
                        <span
                          aria-hidden="true"
                          className="absolute whitespace-nowrap"
                          style={{
                            left: "50%",
                            bottom: -40,
                            transform: "translateX(-50%)",
                            padding: "3px 8px",
                            borderRadius: 6,
                            background: "#7E22CE",
                            color: "#fff",
                            fontFamily: MONO,
                            fontSize: 12,
                          }}
                        >
                          Button · {size}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{ padding: "16px 22px", background: "rgba(22,16,44,0.92)", overflowX: "auto" }}
          >
            <code
              className="whitespace-nowrap"
              style={{ fontFamily: MONO, fontSize: 14, color: "#ECEAF6" }}
            >
              <Code>{`<Button variant="${variant}" size="${size}"${glass ? ' themeVariant="glass"' : ""}>${variant}</Button>`}</Code>
            </code>
          </div>
        </div>

        <aside
          aria-label="Properties"
          className="flex flex-col min-w-0"
          style={{ flex: "1 1 280px", borderLeft: `1px solid ${p.edge}`, background: p.glass }}
        >
          <div
            className="flex items-center justify-between"
            style={{ padding: "16px 22px", borderBottom: "1px solid rgba(127,127,160,0.18)" }}
          >
            <span style={{ fontSize: 14, fontWeight: 700 }}>Properties</span>
            <span style={{ fontFamily: MONO, fontSize: 12, color: p.muted }}>Button</span>
          </div>
          <div className="flex flex-col gap-5" style={{ padding: 22 }}>
            <Segmented
              label="Variant"
              options={variants}
              value={variant}
              onPick={setVariant}
              cols={2}
            />
            <Segmented label="Size" options={sizes} value={size} onPick={setSize} />
            <Segmented label="Look" options={looks} value={look} onPick={setLook} />
            <Switch label="Dark mode (whole page)" checked={dark} onChange={setDark} />
            <p
              style={{
                margin: 0,
                paddingTop: 16,
                borderTop: "1px solid rgba(127,127,160,0.18)",
                fontSize: 13,
                lineHeight: 1.6,
                color: p.muted,
              }}
            >
              To use the glass look elsewhere, pass themeVariant="glass" to a component. Overlay
              functions take "glass" as an argument.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

// overlays -------------------------------------------------------------------------------------------

type Side = "left" | "right" | "top" | "bottom";
const sides: Side[] = ["left", "right", "top", "bottom"];

function Overlays({ p }: { p: Palette }) {
  const [overlay, setOverlay] = useState<"modal" | "drawer">("modal");
  const [side, setSide] = useState<Side>("right");

  const openModal = () => {
    setOverlay("modal");
    showModal(
      "Hello from the portal",
      <p>This modal was created with showModal().</p>,
      undefined,
      "glass",
    );
  };
  const openDrawer = (s: Side) => {
    setOverlay("drawer");
    setSide(s);
    showDrawer(
      `Drawer ${s}`,
      <p>This drawer was created with showDrawer().</p>,
      undefined,
      "glass",
      s,
    );
  };

  const drawerPos: Record<Side, CSSProperties> = {
    left: { left: 0, top: 0, bottom: 0, width: "42%" },
    right: { right: 0, top: 0, bottom: 0, width: "42%" },
    top: { left: 0, right: 0, top: 0, height: "40%" },
    bottom: { left: 0, right: 0, bottom: 0, height: "40%" },
  };
  const mockCard: CSSProperties = {
    height: 110,
    borderRadius: 18,
    background: p.glass,
    border: `1px solid ${p.edge}`,
    boxSizing: "border-box",
  };
  const panel: CSSProperties = {
    background: p.dark ? "rgba(28,24,44,0.92)" : "rgba(255,255,255,0.85)",
    border: `1px solid ${p.edge}`,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 24px 60px -24px rgba(40,20,100,0.5)",
    color: p.ink,
  };

  return (
    <section id="overlays-demo" className="wrap section flex flex-wrap items-center gap-10">
      <div className="flex flex-col gap-4 min-w-0" style={{ flex: "1 1 min(380px, 100%)" }}>
        <h2 style={h2Style}>Open a modal with one function call</h2>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: p.body }}>
          Add one ThemeProvider at the root of your app. Then call showModal(), showDrawer(),
          showAlert() or showToast() from anywhere, even outside React. Drawers can open from any of
          the four sides.
        </p>
        <pre
          style={{
            margin: "8px 0 0",
            padding: "20px 22px",
            borderRadius: 18,
            background: "rgba(22,16,44,0.92)",
            whiteSpace: "pre-wrap",
            fontFamily: MONO,
            fontSize: 13,
            lineHeight: 1.75,
            color: "#ECEAF6",
          }}
        >
          <Code>{`import { showModal, showDrawer } from 'unicornial-ui'

`}</Code>
          <span style={{ color: "#A5D8FF" }}>
            {overlay === "modal"
              ? `showModal("Hello from the portal",\n  <p>This modal was created with showModal().</p>,\n  undefined, "glass")`
              : `showDrawer("Drawer ${side}",\n  <p>This drawer was created with showDrawer().</p>,\n  undefined, "glass", "${side}")`}
          </span>
        </pre>
        <div className="flex flex-col gap-4 pt-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={openModal}>
              Open modal
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                showAlert("warning", "Delete this demo draft? Nothing is really deleted.", "glass")
                  .onConfirm(() =>
                    showToast(
                      "You chose Continue. Nothing was deleted.",
                      "success",
                      undefined,
                      undefined,
                      "glass",
                    ),
                  )
                  .onReject(() =>
                    showToast(
                      "You cancelled. Nothing was deleted.",
                      "info",
                      undefined,
                      undefined,
                      "glass",
                    ),
                  )
              }
            >
              Show alert
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                showToast("This is a success toast.", "success", undefined, undefined, "glass")
              }
            >
              Show toast
            </Button>
          </div>
          <div
            role="group"
            aria-label="Open a drawer"
            className="grid grid-cols-2 gap-2 self-start max-[439px]:grid-cols-1"
          >
            {sides.map((s) => (
              <Button key={s} type="button" variant="outline" onClick={() => openDrawer(s)}>
                Open {s} drawer
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative overflow-hidden min-w-0"
        style={{
          flex: "1 1 min(480px, 100%)",
          height: 400,
          borderRadius: 26,
          background: p.dark
            ? "radial-gradient(400px 300px at 10% 0%, rgba(56,120,160,0.5), transparent 70%), radial-gradient(500px 300px at 60% 100%, rgba(90,70,190,0.55), transparent 70%), #120E22"
            : "radial-gradient(400px 300px at 10% 0%, #C9EEFF, transparent 70%), radial-gradient(400px 300px at 100% 20%, #F3D3FB, transparent 70%), radial-gradient(500px 300px at 60% 100%, #B9B2FF, transparent 70%), #EAE6FB",
          border: `1px solid ${p.edge}`,
          boxShadow: `0 20px 60px -34px ${p.shadow}`,
        }}
      >
        <div
          className="absolute inset-0 flex flex-col gap-4"
          style={{ padding: 28, filter: "blur(6px)", opacity: 0.85 }}
        >
          <Wireframe.Block shape="text" width="34%" height={18} />
          <div
            className="grid gap-3.5"
            style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
          >
            <div style={{ ...mockCard, padding: 16 }}>
              <div style={{ width: 90, height: 32, borderRadius: 10, background: ACCENT }} />
            </div>
            <div style={mockCard} />
            <div style={mockCard} />
          </div>
        </div>
        {overlay === "modal" ? (
          <div
            className="absolute flex flex-col gap-3.5"
            style={{
              ...panel,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(380px, 84%)",
              padding: "22px 24px",
              borderRadius: 20,
              boxSizing: "border-box",
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{ paddingBottom: 12, borderBottom: "1px solid rgba(20,18,31,0.06)" }}
            >
              <span style={{ fontWeight: 700, fontSize: 18 }}>Hello from the portal</span>
              <span style={{ fontSize: 18, color: p.muted }}>✕</span>
            </div>
            <span style={{ fontSize: 14, color: p.body }}>
              This modal was created with showModal().
            </span>
          </div>
        ) : (
          <div
            className="absolute flex flex-col gap-3"
            style={{ ...panel, ...drawerPos[side], padding: 22, boxSizing: "border-box" }}
          >
            <span style={{ fontWeight: 700, fontSize: 16 }}>Drawer · {side}</span>
            <Wireframe.Block shape="text" width="70%" />
            <Wireframe.Block shape="text" width="50%" />
          </div>
        )}
        <Cursor name="Leo" color="#0E7490" className="right-5 bottom-5" />
      </div>
    </section>
  );
}

// looks ----------------------------------------------------------------------------------------------

function Looks({ p }: { p: Palette & { setDark: (v: boolean) => void } }) {
  return (
    <section id="looks" className="wrap section flex flex-col gap-10">
      <SectionHead
        p={p}
        title="Two looks and two modes, from the same code"
        text="These are the real components. Only themeVariant differs between the two panels. Switch dark mode on or off to see both adapt."
      />
      <div className="flex flex-col gap-4">
        <Switch label="Dark mode (whole page)" checked={p.dark} onChange={p.setDark} />
        <div
          className="grid gap-3.5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))" }}
        >
          {looks.map((look) => {
            const themeVariant = look === "glass" ? "glass" : undefined;
            return (
              <div
                key={look}
                className="flex flex-col gap-4"
                style={{
                  padding: 24,
                  borderRadius: 22,
                  border: `1px solid ${p.edge}`,
                  background:
                    look === "glass" ? `${p.pageImage}, ${p.page}` : p.dark ? "#121019" : "#FFFFFF",
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 12, color: p.muted }}>
                  Look: {look} · {p.dark ? "dark" : "light"}
                </span>
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  themeVariant={themeVariant}
                />
                <Switch label="Email me updates" defaultChecked themeVariant={themeVariant} />
                <div className="flex gap-2">
                  <Button type="button" themeVariant={themeVariant}>
                    Primary
                  </Button>
                  <Button type="button" variant="outline" themeVariant={themeVariant}>
                    Outline
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// cta + footer ---------------------------------------------------------------------------------------

function Cta({ p }: { p: Palette }) {
  return (
    <section className="wrap section">
      <div
        className="relative flex flex-col items-center gap-6 text-center"
        style={{
          padding: "clamp(48px, 8vw, 104px) 24px",
          borderRadius: 32,
          backgroundColor: p.dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.45)",
          backgroundImage: `linear-gradient(${p.grid} 1px, transparent 1px), linear-gradient(90deg, ${p.grid} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          border: `1px solid ${p.edge}`,
          boxShadow: `0 24px 70px -40px ${p.shadow}`,
        }}
      >
        <img src={Logo} alt="" style={{ width: 64, height: 69, objectFit: "contain" }} />
        <h2
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "clamp(36px, 5.5vw, 68px)",
            lineHeight: 1.02,
            letterSpacing: "-0.04em",
            maxWidth: "13em",
            textWrap: "balance",
          }}
        >
          Turn your wireframes into a working UI
        </h2>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: p.body, maxWidth: "34em" }}>
          It's free and open source. Built by Unicornial Software.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={README}
            className="inline-flex items-center"
            style={{
              padding: "0 26px",
              height: 50,
              borderRadius: 999,
              background: ACCENT,
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            Quick start
          </a>
          <Link
            to="/docs"
            className="inline-flex items-center"
            style={{
              padding: "0 26px",
              height: 50,
              borderRadius: 999,
              background: p.glassStrong,
              border: `1px solid ${p.edge}`,
              color: p.ink,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 16,
              boxSizing: "border-box",
            }}
          >
            Browse the docs
          </Link>
        </div>
        <span
          aria-hidden="true"
          className="hidden md:block absolute"
          style={{ left: "10%", top: 56 }}
        >
          <Cursor name="Ana" color="#BE185D" className="relative" />
        </span>
        <span
          aria-hidden="true"
          className="hidden md:block absolute"
          style={{ right: "12%", bottom: 60 }}
        >
          <Cursor name="You" color={ACCENT} className="relative" />
        </span>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <Footer themeVariant="glass" className="wrap section mb-6">
      <Footer.Brand logo={Logo} title="Unicornial UI">
        A lightweight, all-in-one React component library from Unicornial Software.
      </Footer.Brand>
      <div className="flex flex-wrap gap-14">
        <Footer.Column title="Library">
          <Footer.Link as={Link} to="/docs">
            Docs
          </Footer.Link>
          <Footer.Link href={README}>Quick start</Footer.Link>
        </Footer.Column>
        <Footer.Column title="Community">
          <Footer.Link href={REPO}>GitHub repository</Footer.Link>
          <Footer.Link href="https://github.com/unicornial-software">
            Unicornial Software
          </Footer.Link>
        </Footer.Column>
      </div>
    </Footer>
  );
}

// page -----------------------------------------------------------------------------------------------

export function Landing() {
  const { dark, setDarkMode } = useTheme();
  const p = { ...palette(dark.enabled), setDark: setDarkMode };
  const { hash } = useLocation();
  // the sections don't exist yet when the browser handles a /#section URL
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  return (
    <div
      className="landing relative min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        color: p.ink,
        backgroundColor: p.page,
        backgroundImage: p.pageImage,
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2"
        style={{ background: ACCENT, color: "#fff" }}
      >
        Skip to content
      </a>
      <Nav p={p} setDark={setDarkMode} />
      <main id="main">
        <Hero p={p} />
        <Stats p={p} />
        <Playground p={p} setDark={setDarkMode} />
        <Overlays p={p} />
        <Looks p={p} />
        <Cta p={p} />
      </main>
      <SiteFooter />
    </div>
  );
}
