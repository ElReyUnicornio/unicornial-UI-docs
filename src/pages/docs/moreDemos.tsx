import { useRef, useState } from "react";
import {
  Background,
  Button,
  ColorPicker,
  DatePicker,
  Dropdown,
  FileInput,
  Footer,
  Header,
  ImageInput,
  Input,
  Password,
  Select,
  Separator,
  Surface,
  TextArea,
  Wireframe,
} from "unicornial-ui";
import Logo from "../../assets/logo.svg";
import { Card, Grid, Row, type DemoProps } from "./ui";

export function FieldsDemo({ look }: DemoProps) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("#7642ef");
  // several copies can be on screen in compare mode, so ids include the look
  const id = (field: string) => `${field}-${look ?? "default"}`;

  return (
    <Grid>
      <Card
        title="Text"
        description={name ? `Name: ${name}` : "Input, Password and TextArea use the normal DOM event"}
        look={look}
        code={`const [name, setName] = useState("");

<Input label="Name" value={name} onChange={(event) => setName(event.target.value)} />`}
      >
        <Input themeVariant={look} id={id("name")} label="Name" value={name} onChange={(event) => setName(event.target.value)} />
        <Password themeVariant={look} id={id("password")} label="Password" />
        <TextArea themeVariant={look} id={id("notes")} label="Notes" />
      </Card>
      <Card
        title="Pickers"
        description={`Values: ${[country, date, color].filter(Boolean).join(", ")}`}
        look={look}
        code={`const [country, setCountry] = useState("");

// these hand you the value, not the event
<Select label="Country" value={country} onChange={setCountry}
  options={[{ value: "mx", label: "Mexico" }]} />`}
      >
        <Select
          themeVariant={look}
          label="Country"
          value={country}
          onChange={setCountry}
          options={[
            { value: "mx", label: "Mexico" },
            { value: "es", label: "Spain" },
            { value: "ar", label: "Argentina" },
          ]}
        />
        <DatePicker themeVariant={look} label="Date" value={date} onChange={setDate} />
        <ColorPicker themeVariant={look} label="Color" value={color} onChange={setColor} />
      </Card>
      <Card title="Files" look={look}>
        <FileInput themeVariant={look} label="Document" />
        <ImageInput themeVariant={look} label="Avatar" />
      </Card>
    </Grid>
  );
}

export function DropdownDemo({ look }: DemoProps) {
  const anchor = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <Card
      title="Dropdown"
      description="A panel anchored to a trigger. You control open."
      look={look}
      code={`<Button ref={anchor} onClick={() => setOpen(!open)}>Options</Button>
<Dropdown anchorRef={anchor} open={open} onClose={() => setOpen(false)}>
  Panel content
</Dropdown>`}
    >
      <Row>
        <Button ref={anchor} type="button" variant="outline" themeVariant={look} aria-expanded={open} onClick={() => setOpen(!open)}>
          Options
        </Button>
      </Row>
      <Dropdown anchorRef={anchor} open={open} onClose={() => setOpen(false)} themeVariant={look}>
        <p className="p-3 text-sm">Panel content</p>
      </Dropdown>
    </Card>
  );
}

export function LayoutDemo({ look }: DemoProps) {
  return (
    <Grid>
      <Card
        title="Header"
        look={look}
        code={`<Header behaviour="sticky">
  <Header.Logo src={logo} alt="" title="Acme" />
  <Header.NavButton as={Link} to="/pricing">Pricing</Header.NavButton>
</Header>`}
      >
        {/* the header is absolute, so the preview gives it a positioned box */}
        <div className="relative h-24 overflow-hidden rounded-md border border-border">
          <Header themeVariant={look} className="px-4 sm:px-4">
            <Header.Logo src={Logo} alt="" title="Acme" />
            <Header.NavButton href="#header-demo" onClick={(event) => event.preventDefault()} className="ml-auto">
              Pricing
            </Header.NavButton>
          </Header>
        </div>
      </Card>
      <Card
        title="Footer"
        look={look}
        code={`<Footer>
  <Footer.Brand title="Acme">Short description.</Footer.Brand>
  <Footer.Column title="Product">
    <Footer.Link as={Link} to="/docs">Docs</Footer.Link>
  </Footer.Column>
</Footer>`}
      >
        <Footer themeVariant={look} className="px-5 sm:px-5 py-5 gap-6">
          <Footer.Brand title="Acme">Short description.</Footer.Brand>
          <Footer.Column title="Product">
            <Footer.Link href="#footer-demo" onClick={(event) => event.preventDefault()}>Docs</Footer.Link>
            <Footer.Link href="#footer-demo" onClick={(event) => event.preventDefault()}>Pricing</Footer.Link>
          </Footer.Column>
        </Footer>
      </Card>
      <Card
        title="Wireframe"
        description="Placeholders for sketches; hidden from screen readers"
        look={look}
        code={`<Wireframe>
  <Wireframe.Block shape="text" width="40%" />
  <Wireframe.Block />
  <Wireframe.Row>
    <Wireframe.Block shape="pill" tone="fill" width={88} />
    <Wireframe.Block shape="pill" width={72} />
  </Wireframe.Row>
</Wireframe>`}
      >
        <Wireframe themeVariant={look}>
          <Wireframe.Block shape="text" width="40%" />
          <Wireframe.Block />
          <Wireframe.Row>
            <Wireframe.Block shape="pill" tone="fill" width={88} />
            <Wireframe.Block shape="pill" width={72} />
          </Wireframe.Row>
        </Wireframe>
      </Card>
      <Card title="Surface and Separator" look={look}>
        <Surface themeVariant={look}>
          <p className="text-sm">Surface is the library's card.</p>
          <Separator themeVariant={look} />
          <p className="text-sm">A separator splits its content.</p>
        </Surface>
      </Card>
      <Card
        title="Background"
        description="Decorative patterns"
        look={look}
        code={`// The pattern is a fixed layer behind the content. A transform on the
// component keeps it inside the box instead of behind the page.
<Background variant="grid" size={20} color="#88888855"
  style={{ transform: "translateZ(0)" }}>
  Content
</Background>`}
      >
        <Background
          variant="grid"
          size={20}
          color="#88888855"
          mask="none"
          className="h-28 shrink-0 items-center justify-center rounded-md border border-border text-sm"
          style={{ transform: "translateZ(0)" }}
        >
          Content
        </Background>
      </Card>
    </Grid>
  );
}
