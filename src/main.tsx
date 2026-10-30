import { StrictMode, useRef, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Logo from "./assets/logo.png";
import darkLogo from "./assets/darklogo.png";
import { Accordion, Alert, Background, Button, Form, Gestures, get, Header, HttpError, ProgressBar, RadioGroup, showAlert, showDrawer, showModal, showToast, Sidebar, Slider, Spinner, Surface, Switch, Tabs, ThemeProvider, Tooltip, UnicornialColorPicker, UnicornialDatePicker, UnicornialFileInput, UnicornialImageInput, UnicornialInput, UnicornialPassword, UnicornialSelect, UnicornialTextArea, useTheme, Validate, type TooltipPosition } from "unicornial-ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider config={{ dark: { enabled: false } }}>
      <Main />
    </ThemeProvider>
  </StrictMode>,
);

// layout helpers ------------------------------------------------------------------------------------

function Card({
  title,
  description,
  look,
  className = "",
  children,
}: {
  title: string;
  description?: string;
  look?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Surface themeVariant={look} className={`flex flex-col gap-3 ${className}`}>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {description && <p className="text-sm opacity-60">{description}</p>}
      </div>
      {children}
    </Surface>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 grid-cols-1 xl:grid-cols-2 items-start">{children}</div>;
}

// sections ------------------------------------------------------------------------------------------

interface SectionProps {
  look?: string;
}

function ButtonsSection({ look }: SectionProps) {
  return (
    <Grid>
      <Card title="Variants" look={look}>
        <Row>
          {(["primary", "secondary", "outline", "ghost"] as const).map((variant) => (
            <Button key={variant} variant={variant} themeVariant={look}>
              {variant}
            </Button>
          ))}
        </Row>
      </Card>
      <Card title="Sizes" look={look}>
        <Row>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Button key={size} size={size} themeVariant={look}>
              Size {size}
            </Button>
          ))}
        </Row>
      </Card>
      <Card title="Disabled" look={look}>
        <Row>
          {(["primary", "secondary", "outline", "ghost"] as const).map((variant) => (
            <Button key={variant} variant={variant} themeVariant={look} disabled>
              {variant}
            </Button>
          ))}
        </Row>
      </Card>
    </Grid>
  );
}

function FormsSection({ look }: SectionProps) {
  return (
    <Form
      initialValues={{}}
      onSubmit={(values, hasErrors) =>
        hasErrors ? console.log("Form has errors.") : console.log("Form submitted:", values)
      }
    >
      <Grid>
        <Card title="Text" description="Inputs with validation" look={look}>
          <UnicornialInput
            themeVariant={look}
            label="Email"
            name="email"
            placeholder="you@example.com"
            validator={Validate.email()}
          />
          <UnicornialPassword
            themeVariant={look}
            name="password"
            label="Password"
            placeholder="At least 6 characters"
            validator={Validate.minLength(6)}
          />
          <UnicornialTextArea
            themeVariant={look}
            name="message"
            label="Message"
            placeholder="Write something..."
            validator={Validate.required()}
          />
        </Card>
        <Card title="Pickers" look={look}>
          <UnicornialSelect
            themeVariant={look}
            name="country"
            label="Country"
            validator={Validate.required()}
            options={[
              { value: "mx", label: "Mexico" },
              { value: "es", label: "Spain" },
              { value: "ar", label: "Argentina" },
              { value: "co", label: "Colombia", disabled: true },
            ]}
          />
          <UnicornialDatePicker
            themeVariant={look}
            name="date"
            label="Date"
            format="DD MMM YYYY"
            validator={Validate.required()}
          />
          <UnicornialColorPicker themeVariant={look} name="color" label="Color" format="oklch" />
        </Card>
        <Card title="Files" look={look}>
          <UnicornialFileInput themeVariant={look} name="document" label="Document" />
          <UnicornialImageInput themeVariant={look} name="avatar" label="Avatar" />
        </Card>
        <Card title="Submit" description="Shows every validation error at once" look={look}>
          <Row>
            <Button type="submit" themeVariant={look}>
              Submit
            </Button>
            <Button type="reset" variant="outline" themeVariant={look}>
              Reset
            </Button>
          </Row>
        </Card>
      </Grid>
    </Form>
  );
}

function ControlsSection({ look }: SectionProps) {
  const [progress, setProgress] = useState(40);

  return (
    <Grid>
      <Card title="Switch & radio" look={look}>
        <Switch themeVariant={look} label="Notifications" defaultChecked />
        <Switch themeVariant={look} label="Disabled" disabled />
        <RadioGroup
          themeVariant={look}
          label="Plan"
          defaultValue="free"
          orientation="horizontal"
          options={[
            { value: "free", label: "Free" },
            { value: "pro", label: "Pro" },
            { value: "team", label: "Team" },
          ]}
        />
      </Card>
      <Card title="Slider & spinner" look={look}>
        <Slider themeVariant={look} label="Volume" showValue defaultValue={30} />
        <Spinner themeVariant={look} label="Quantity" min={0} max={10} defaultValue={1} />
      </Card>
      <Card title="Progress" look={look}>
        <ProgressBar themeVariant={look} label="Upload" showValue value={progress} />
        <Row>
          <Button
            type="button"
            variant="outline"
            size="sm"
            themeVariant={look}
            onClick={() => setProgress((p) => Math.max(0, p - 10))}
          >
            -10
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            themeVariant={look}
            onClick={() => setProgress((p) => Math.min(100, p + 10))}
          >
            +10
          </Button>
        </Row>
        <ProgressBar themeVariant={look} label="Loading" indeterminate />
      </Card>
    </Grid>
  );
}

function FeedbackSection({ look }: SectionProps) {
  return (
    <Grid>
      <Card title="Alerts" look={look}>
        <div className="flex flex-col gap-2">
          <Alert variant="info" themeVariant={look}>
            This is an informational message.
          </Alert>
          <Alert variant="success" themeVariant={look}>
            Your changes were saved.
          </Alert>
          <Alert variant="warning" themeVariant={look}>
            This is a warning message.
          </Alert>
          <Alert variant="error" themeVariant={look}>
            Something went wrong.
          </Alert>
        </div>
      </Card>
      <Card title="Toasts" description="showToast()" look={look}>
        <Row>
          {(["info", "success", "warning", "error"] as const).map((color) => (
            <Button
              key={color}
              type="button"
              variant="outline"
              size="sm"
              themeVariant={look}
              onClick={() =>
                showToast(
                  `This is a ${color} toast.`,
                  color,
                  () => console.log(`${color} toast clicked`),
                  undefined,
                  look,
                )
              }
            >
              {color}
            </Button>
          ))}
        </Row>
      </Card>
      <Card
        title="Alert dialogs"
        description="showAlert() resolves on confirm / reject"
        look={look}
      >
        <Row>
          {(["info", "success", "warning", "error"] as const).map((type) => (
            <Button
              key={type}
              type="button"
              variant="outline"
              size="sm"
              themeVariant={look}
              onClick={() =>
                showAlert(type, `This is a ${type} alert.`, look)
                  .onConfirm(() => console.log(`${type} confirmed`))
                  .onReject(() => console.log(`${type} rejected`))
              }
            >
              {type}
            </Button>
          ))}
        </Row>
      </Card>
    </Grid>
  );
}

function TooltipDemo({ position, look }: { position: TooltipPosition; look?: string }) {
  const anchor = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        ref={anchor}
        type="button"
        variant="secondary"
        size="sm"
        themeVariant={look}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {position}
      </Button>
      <Tooltip anchorRef={anchor} position={position} open={open} themeVariant={look}>
        Tooltip on the {position}
      </Tooltip>
    </>
  );
}

function OverlaysSection({ look }: SectionProps) {
  return (
    <Grid>
      <Card title="Modal" description="showModal()" look={look}>
        <Row>
          <Button
            type="button"
            themeVariant={look}
            onClick={() =>
              showModal(
                "Hello from the portal",
                <p>This modal was created with showModal().</p>,
                undefined,
                look,
              )
            }
          >
            Open modal
          </Button>
        </Row>
      </Card>
      <Card title="Drawer" description="showDrawer() from any side" look={look}>
        <Row>
          {(["left", "right", "top", "bottom"] as const).map((side) => (
            <Button
              key={side}
              type="button"
              variant="outline"
              size="sm"
              themeVariant={look}
              onClick={() =>
                showDrawer(
                  `Drawer ${side}`,
                  <p>This drawer was created with showDrawer().</p>,
                  undefined,
                  look,
                  side,
                )
              }
            >
              {side}
            </Button>
          ))}
        </Row>
      </Card>
      <Card title="Tooltip" description="Hover each button" look={look}>
        <Row>
          {(["top", "bottom", "left", "right"] as const).map((position) => (
            <TooltipDemo key={position} position={position} look={look} />
          ))}
        </Row>
      </Card>
    </Grid>
  );
}

function NavigationSection({ look }: SectionProps) {
  const [underline, setUnderline] = useState(0);
  const [pills, setPills] = useState(0);
  const labels = ["Overview", "Activity", "Settings"];

  return (
    <Grid>
      <Card title="Tabs: underline" look={look}>
        <Tabs variant="underline" themeVariant={look} onChange={setUnderline}>
          {labels.map((label) => (
            <Tabs.Item key={label}>{label}</Tabs.Item>
          ))}
        </Tabs>
        <p className="text-sm opacity-60">Selected: {labels[underline]}</p>
      </Card>
      <Card title="Tabs: pills" look={look}>
        <Tabs variant="pills" themeVariant={look} onChange={setPills}>
          {labels.map((label) => (
            <Tabs.Item key={label}>{label}</Tabs.Item>
          ))}
        </Tabs>
        <p className="text-sm opacity-60">Selected: {labels[pills]}</p>
      </Card>
      <Card title="Accordion: single" look={look}>
        <Accordion themeVariant={look} defaultValue={["one"]}>
          <Accordion.Item value="one" title="What is Unicornial UI?">
            A small, themeable React component library.
          </Accordion.Item>
          <Accordion.Item value="two" title="Is it accessible?">
            Items expose aria-expanded and aria-controls.
          </Accordion.Item>
          <Accordion.Item value="three" title="Disabled item" disabled>
            You can't see this.
          </Accordion.Item>
        </Accordion>
      </Card>
      <Card title="Accordion: multiple" look={look}>
        <Accordion type="multiple" themeVariant={look} defaultValue={["a", "b"]}>
          <Accordion.Item value="a" title="First">
            Several items can stay open at once.
          </Accordion.Item>
          <Accordion.Item value="b" title="Second">
            This one starts open too.
          </Accordion.Item>
          <Accordion.Item value="c" title="Third">
            Closed until you click it.
          </Accordion.Item>
        </Accordion>
      </Card>
    </Grid>
  );
}

function InteractionSection({ look }: SectionProps) {
  const [lastGesture, setLastGesture] = useState("none");
  const [request, setRequest] = useState("not sent");

  const sendRequest = async () => {
    try {
      await get("/api/ping", { q: "demo" }, true);
      setRequest("ok");
    } catch (error) {
      setRequest(error instanceof HttpError ? `HttpError ${error.status}` : String(error));
    }
  };

  return (
    <Grid>
      <Card title="Gestures" description="Tap, double tap or swipe inside the box" look={look}>
        <Gestures
          className="h-32 flex items-center justify-center rounded-md border border-dashed select-none"
          onTap={() => setLastGesture("tap")}
          onDoubleTap={() => setLastGesture("double tap")}
          onSwipeLeft={() => setLastGesture("swipe left")}
          onSwipeRight={() => setLastGesture("swipe right")}
          onSwipeUp={() => setLastGesture("swipe up")}
          onSwipeDown={() => setLastGesture("swipe down")}
        >
          Last gesture: <strong className="ml-1">{lastGesture}</strong>
        </Gestures>
      </Card>
      <Card title="HTTP" description="get() with requireAuth, reads env.apiUrl" look={look}>
        <Row>
          <Button
            type="button"
            variant="outline"
            size="sm"
            themeVariant={look}
            onClick={sendRequest}
          >
            get("/api/ping")
          </Button>
          <span className="text-sm opacity-70">{request}</span>
        </Row>
      </Card>
    </Grid>
  );
}

// page ----------------------------------------------------------------------------------------------

const sections = [
  { id: "buttons", label: "Buttons", Component: ButtonsSection },
  { id: "forms", label: "Forms", Component: FormsSection },
  { id: "controls", label: "Controls", Component: ControlsSection },
  { id: "feedback", label: "Feedback", Component: FeedbackSection },
  { id: "overlays", label: "Overlays", Component: OverlaysSection },
  { id: "navigation", label: "Navigation", Component: NavigationSection },
  { id: "interaction", label: "Interaction", Component: InteractionSection },
];

const looks = [undefined, "glass", "neumorph", "clay"];

function Main() {
  const { currentColors, dark, setDarkMode } = useTheme();
  const [sectionId, setSectionId] = useState(sections[0].id);
  const [look, setLook] = useState<string | undefined>(undefined);
  const active = sections.find((section) => section.id === sectionId) ?? sections[0];

  return (
    <div
      className="h-screen flex flex-col"
      style={{ backgroundColor: currentColors.background, color: currentColors.text }}
    >
      <Header themeVariant={look} className="z-10">
        <Header.Logo src={Logo} darkSrc={darkLogo} alt="Logo" title="Unicornial-UI" />
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            {looks.map((name) => (
              <Button
                key={name ?? "default"}
                type="button"
                size="sm"
                variant={look === name ? "primary" : "ghost"}
                onClick={() => setLook(name)}
              >
                {name ?? "default"}
              </Button>
            ))}
          </div>
          <Switch themeVariant={look} label="Dark" checked={dark.enabled} onChange={setDarkMode} />
        </div>
      </Header>

      <div className="flex flex-1 min-h-0 pt-16">
        <Sidebar themeVariant={look}>
          <Sidebar.Header title="Components" />
          {sections.map((section) => (
            <Sidebar.Button
              key={section.id}
              active={section.id === active.id}
              icon={
                <span
                  aria-hidden="true"
                  className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-semibold bg-hover"
                >
                  {section.label[0]}
                </span>
              }
              onClick={() => setSectionId(section.id)}
            >
              {section.label}
            </Sidebar.Button>
          ))}
        </Sidebar>

        <Background
          variant="dots-grid"
          size={24}
          color="#88888822"
          mask="none"
          className="flex-1 min-w-0 overflow-auto"
        >
          <main className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold">{active.label}</h1>
              <p className="text-sm opacity-60">
                Look: {look ?? "default"} · {dark.enabled ? "dark" : "light"}
              </p>
            </div>
            <active.Component look={look} />
          </main>
        </Background>
      </div>
    </div>
  );
}
