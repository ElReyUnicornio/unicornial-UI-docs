import { useRef, useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Gestures,
  HttpError,
  ProgressBar,
  RadioGroup,
  Slider,
  Spinner,
  Switch,
  Tabs,
  Tooltip,
  get,
  showAlert,
  showDrawer,
  showModal,
  showToast,
  type TooltipPosition,
} from "unicornial-ui";
import { Card, Grid, Row, type DemoProps } from "./ui";

export function ButtonsDemo({ look }: DemoProps) {
  return (
    <Grid>
      <Card
        title="Variants"
        look={look}
        code={`<Button variant="outline" size="sm" themeVariant="glass">
  Save
</Button>`}
      >
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

export function ControlsDemo({ look }: DemoProps) {
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

export function FeedbackDemo({ look }: DemoProps) {
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
      <Card
        title="Toasts"
        description="showToast()"
        look={look}
        code={`showToast("Saved", "success", onClick?, 4000, themeVariant?);`}
      >
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
        code={`showAlert("warning", "Are you sure?")
  .onConfirm(() => remove())
  .onReject(() => keep());`}
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
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {position}
      </Button>
      <Tooltip anchorRef={anchor} position={position} open={open} themeVariant={look}>
        Tooltip on the {position}
      </Tooltip>
    </>
  );
}

export function OverlaysDemo({ look }: DemoProps) {
  return (
    <Grid>
      <Card
        title="Modal"
        description="showModal()"
        look={look}
        code={`showModal("Title", <p>Content</p>, onClose?, themeVariant?);`}
      >
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
      <Card
        title="Drawer"
        description="showDrawer() from any side"
        look={look}
        code={`showDrawer("Title", <p>Content</p>, onClose?, themeVariant?, "left");`}
      >
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
      <Card title="Tooltip" description="Hover or focus each button" look={look}>
        <Row>
          {(["top", "bottom", "left", "right"] as const).map((position) => (
            <TooltipDemo key={position} position={position} look={look} />
          ))}
        </Row>
      </Card>
    </Grid>
  );
}

export function NavigationDemo({ look }: DemoProps) {
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

export function InteractionDemo({ look }: DemoProps) {
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
      <Card
        title="HTTP"
        description="get() with requireAuth, reads env.apiUrl. There is no backend here, so an error is the expected result."
        look={look}
        code={`const data = await get<User>("/api/me", undefined, true);`}
      >
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
