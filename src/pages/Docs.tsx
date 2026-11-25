import { useEffect, type ReactNode } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Background, Button, Header, Sidebar, Switch, useMediaQuery, useTheme } from "unicornial-ui";
import Logo from "../assets/logo.svg";
import Charts from "./docs/Charts";
import { PropsTable, groups } from "./docs/Components";
import Installation from "./docs/Installation";
import Styling from "./docs/Styling";
import Theme from "./docs/Theme";
import UnicornialInputs from "./docs/UnicornialInputs";

const icon = (path: string): ReactNode => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const sections = [
  {
    id: "installation",
    label: "Installation",
    intro: "Add the package and wrap your app.",
    icon: icon("M12 3v12m0 0-4-4m4 4 4-4M4 17v3h16v-3"),
  },
  {
    id: "theme",
    label: "Theme",
    intro: "One config for colors, dark mode, text and runtime values.",
    icon: icon("M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2.2-.5-1.3.3-2.3 1.6-2.3H17a4 4 0 0 0 4-4C21 7 17 3 12 3ZM7.5 11h.01M11 7.5h.01M15.5 8.5h.01"),
  },
  {
    id: "styling",
    label: "Styling",
    intro: "Change how components look, one at a time or all at once.",
    icon: icon("M14 4l6 6-9 9H5v-6l9-9ZM12 6l6 6"),
  },
  {
    id: "components",
    label: "Components",
    intro: "Live examples, grouped by what they do.",
    icon: icon("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"),
  },
  {
    id: "unicornial-inputs",
    label: "Unicornial inputs",
    intro: "Form fields that keep their own value and validate themselves.",
    icon: icon("M3 7h18v10H3zM7 10v4"),
  },
  {
    id: "charts",
    label: "Charts",
    intro: "Not available yet.",
    icon: icon("M4 20V4m0 16h16M8 16v-5m5 5V8m5 8v-7"),
  },
];

/** Links to the previous showcase pages keep working. */
const moved: Record<string, string> = {
  buttons: "components/buttons",
  controls: "components/controls",
  feedback: "components/feedback",
  overlays: "components/overlays",
  navigation: "components/navigation",
  interaction: "components/interaction",
  forms: "unicornial-inputs",
};

const looks = [undefined, "glass"];

/** Soft color blobs so the glass look has something to blur. */
const glassBackdrop =
  "radial-gradient(45% 40% at 15% 10%, rgba(125, 211, 252, 0.5), transparent), radial-gradient(40% 45% at 85% 25%, rgba(192, 132, 252, 0.5), transparent), radial-gradient(50% 50% at 60% 95%, rgba(99, 102, 241, 0.4), transparent)";

export default function Docs() {
  const { currentColors, dark, setDarkMode } = useTheme();
  const { section: sectionId, item } = useParams();
  const [params, setParams] = useSearchParams();
  const narrow = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const active = sections.find((section) => section.id === sectionId);
  const group = active?.id === "components" ? (groups.find((g) => g.id === item) ?? groups[0]) : undefined;
  const hasDemos = !!group || active?.id === "unicornial-inputs";

  const requestedLook = params.get("look") ?? undefined;
  const look = hasDemos && looks.includes(requestedLook) ? requestedLook : undefined;
  // two copies of a form would repeat field ids, so only component demos can be compared
  const compare = !!group && params.get("compare") === "1";
  const glassPage = look === "glass" && !compare;
  const search = params.toString();

  const setParam = (name: string, value?: string) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set(name, value);
        else next.delete(name);
        return next;
      },
      { replace: true },
    );

  // Keep the color mode in the URL, so a shared link opens the same view.
  const mode = dark.enabled ? "dark" : "light";
  useEffect(() => {
    if (!active || params.get("mode") === mode) return;
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.set("mode", mode);
        return next;
      },
      { replace: true },
    );
  }, [active, mode, params, setParams]);

  const title = group ? group.label : active?.label;
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    document.title = `${title} · Unicornial UI`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  if (!active) {
    const target = (sectionId && moved[sectionId]) || "installation";
    return <Navigate to={{ pathname: `/docs/${target}`, search }} replace />;
  }

  const page =
    active.id === "installation" ? <Installation />
    : active.id === "theme" ? <Theme />
    : active.id === "styling" ? <Styling />
    : active.id === "unicornial-inputs" ? <UnicornialInputs look={look} />
    : active.id === "charts" ? <Charts />
    : null;

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        backgroundColor: currentColors.background,
        color: currentColors.text,
        backgroundImage: glassPage ? glassBackdrop : undefined,
      }}
    >
      <Header themeVariant={look} className="z-10 gap-2">
        <Link to="/" aria-label="Back to the home page" className="flex items-center">
          <Header.Logo src={Logo} alt="" title={narrow ? "" : "Unicornial UI"} />
        </Link>
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {hasDemos && (
            <div className="flex items-center gap-1" role="group" aria-label="Look">
              {looks.map((name) => (
                <Button
                  key={name ?? "default"}
                  type="button"
                  size="sm"
                  variant={look === name ? "primary" : "ghost"}
                  aria-pressed={look === name}
                  disabled={compare}
                  onClick={() => setParam("look", name)}
                >
                  {name ?? "default"}
                </Button>
              ))}
            </div>
          )}
          {group && (
            <div className="hidden lg:block">
              <Switch label="Compare" checked={compare} onChange={(value) => setParam("compare", value ? "1" : undefined)} />
            </div>
          )}
          <Switch
            themeVariant={look}
            label={narrow ? undefined : "Dark"}
            aria-label="Dark mode"
            checked={dark.enabled}
            onChange={setDarkMode}
          />
        </div>
      </Header>

      <div className={`flex flex-1 min-h-0 ${glassPage ? "pt-20" : "pt-16"}`}>
        {/* always icons only on narrow screens, so there's nothing to expand there */}
        <Sidebar themeVariant={look} collapsed={narrow}>
          <Sidebar.Header title="Documentation" collapsible={false} />
          <nav aria-label="Documentation" className="flex flex-col gap-1">
            {sections.map((section) => (
              <Sidebar.Button
                key={section.id}
                active={section.id === active.id}
                icon={section.icon}
                aria-label={section.label}
                onClick={() => navigate({ pathname: `/docs/${section.id}`, search })}
              >
                {section.label}
              </Sidebar.Button>
            ))}
          </nav>
        </Sidebar>

        <Background
          // a new key starts every page at the top
          key={`${active.id}/${group?.id ?? ""}`}
          variant="dots-grid"
          size={24}
          color="#88888822"
          mask="none"
          className="flex-1 min-w-0 overflow-auto"
        >
          <main className={`w-full mx-auto p-4 pb-16 sm:p-6 sm:pb-16 flex flex-col gap-5 ${compare ? "max-w-7xl" : "max-w-5xl"}`}>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="mt-1 max-w-[70ch] text-sm opacity-70">{group ? group.description : active.intro}</p>
            </div>

            {page}

            {group && (
              <>
                <nav aria-label="Component groups" className="flex flex-wrap gap-2">
                  {groups.map((g) => (
                    <Link
                      key={g.id}
                      to={{ pathname: `/docs/components/${g.id}`, search }}
                      aria-current={g.id === group.id ? "page" : undefined}
                      className="rounded-full border border-border px-3.5 py-1.5 text-sm font-medium aria-[current=page]:border-accent aria-[current=page]:bg-hover focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      {g.label}
                    </Link>
                  ))}
                </nav>
                {compare ? (
                  <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
                    {looks.map((name) => (
                      <section
                        key={name ?? "default"}
                        aria-label={`${name ?? "default"} look`}
                        className="@container min-w-0 flex flex-col gap-4 rounded-xl border p-4"
                        style={{ borderColor: currentColors.border, backgroundImage: name === "glass" ? glassBackdrop : undefined }}
                      >
                        <h2 className="text-sm font-semibold">{name ?? "default"}</h2>
                        <group.Demo look={name} />
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="@container">
                    <group.Demo look={look} />
                  </div>
                )}
                <PropsTable group={group} />
              </>
            )}
          </main>
        </Background>
      </div>
    </div>
  );
}
