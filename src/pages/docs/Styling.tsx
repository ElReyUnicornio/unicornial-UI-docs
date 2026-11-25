import { useEffect, useState } from "react";
import { Button, Input, Surface, Switch, useTheme, type ComponentParts, type ThemeVariant } from "unicornial-ui";
import { Block, C, Card, CodeBlock, Row, Table, Text } from "./ui";

/** A custom look, defined as data. */
const square: ThemeVariant = {
  button: { root: { style: { borderRadius: 0, textTransform: "uppercase", letterSpacing: "0.04em" } } },
  input: { field: { style: { borderRadius: 0, borderWidth: 2 } } },
};

/**
 * Every variant part, per component. `satisfies` makes the build fail if the library
 * adds or removes a component or a part, so this table can't go stale silently.
 */
const parts = {
  surface: { root: 1 },
  button: { root: 1, primary: 1, secondary: 1, outline: 1, ghost: 1 },
  input: { root: 1, label: 1, field: 1 },
  header: { root: 1, navButton: 1 },
  footer: { root: 1, column: 1, title: 1, link: 1 },
  wireframe: { root: 1, block: 1 },
  modal: { backdrop: 1, container: 1, header: 1, title: 1, body: 1 },
  drawer: { backdrop: 1, container: 1, header: 1, title: 1, body: 1 },
  alertDialog: { backdrop: 1, container: 1, icon: 1, message: 1 },
  alert: { root: 1 },
  toast: { root: 1 },
  tooltip: { root: 1, arrow: 1 },
  tab: { root: 1, selected: 1 },
  separator: { root: 1 },
  dropdown: { root: 1 },
  select: { option: 1, optionActive: 1 },
  switch: { track: 1, thumb: 1 },
  spinner: { button: 1 },
  slider: { track: 1, fill: 1, thumb: 1 },
  radio: { control: 1, dot: 1 },
  progressBar: { track: 1, bar: 1 },
  imageInput: { area: 1 },
  datePicker: { day: 1, daySelected: 1 },
  colorPicker: { swatch: 1 },
  accordion: { root: 1, item: 1, header: 1, body: 1 },
  sidebar: { root: 1, header: 1, button: 1 },
} satisfies { [C in keyof ComponentParts]: Record<ComponentParts[C], 1> };

function LookDemo() {
  const { setVariant } = useTheme();
  useEffect(() => setVariant("square", square), [setVariant]);
  const [look, setLook] = useState<string | undefined>("glass");

  return (
    <Card title="Compare looks" description="Same components, only themeVariant changes. The square look is defined on this page.">
      <Row>
        {[undefined, "glass", "square"].map((name) => (
          <Button
            key={name ?? "default"}
            type="button"
            size="sm"
            variant={look === name ? "primary" : "outline"}
            aria-pressed={look === name}
            onClick={() => setLook(name)}
          >
            {name ?? "default"}
          </Button>
        ))}
      </Row>
      <div
        className="rounded-xl p-4"
        style={{ backgroundImage: "radial-gradient(60% 90% at 10% 0%, rgba(125,211,252,0.45), transparent), radial-gradient(60% 90% at 90% 100%, rgba(192,132,252,0.5), transparent)" }}
      >
        <Surface themeVariant={look} className="flex flex-col gap-3">
          <Input themeVariant={look} id="look-demo" label="Email" placeholder="you@example.com" />
          <Switch themeVariant={look} label="Notifications" defaultChecked />
          <Row>
            <Button type="button" themeVariant={look}>Save</Button>
            <Button type="button" variant="outline" themeVariant={look}>Cancel</Button>
          </Row>
        </Surface>
      </div>
    </Card>
  );
}

export default function Styling() {
  return (
    <>
      <Block title="Which style wins">
        <Text>
          A component applies its base styles first, then the look chosen with{" "}
          <C>themeVariant</C>, then your <C>className</C> and <C>style</C>. An inline{" "}
          <C>style</C> beats any class.
        </Text>
        <CodeBlock label="overrides">{`<Button themeVariant="glass" style={{ borderRadius: 8 }}>
  Save
</Button>`}</CodeBlock>
      </Block>

      <Block title="Built-in looks">
        <Text>
          There is the default look and <C>glass</C>, which adapts to light and dark mode. Most
          components accept <C>themeVariant</C>. For the floating helpers it's an argument:
        </Text>
        <CodeBlock label="glass helpers">{`showModal("Title", <p>Content</p>, undefined, "glass");
showDrawer("Title", <p>Content</p>, undefined, "glass", "left");
showAlert("warning", "Continue?", "glass");
showToast("Saved", "success", undefined, 4000, "glass");`}</CodeBlock>
      </Block>

      <Block title="Create your own look">
        <Text>
          A look is data: <C>variants[name][component][part]</C>, where each part takes a{" "}
          <C>className</C>, a <C>style</C> or both. Component and part names are typed, so a
          typo is a TypeScript error. Components you don't list keep the default look.
        </Text>
        <CodeBlock label="custom look">{`const square: ThemeVariant = {
  button: { root: { style: { borderRadius: 0, textTransform: "uppercase" } } },
  input: { field: { style: { borderRadius: 0, borderWidth: 2 } } },
};

<ThemeProvider config={{ theme: { variants: { square } } }}>
  <Button themeVariant="square">Save</Button>
</ThemeProvider>`}</CodeBlock>
        <LookDemo />
        <Text>
          Tailwind classes written in a look only work if that CSS exists, either in the
          library's stylesheet or in your own Tailwind build. Use <C>style</C> for values that
          must always apply.
        </Text>
      </Block>

      <Block title="Variant parts">
        <Table
          label="Variant parts by component"
          head={["Component", "Parts"]}
          rows={Object.entries(parts).map(([name, list]) => [name, Object.keys(list).join(", ")])}
        />
        <Text>
          Text fields, including Select, DatePicker and ColorPicker, share the <C>input</C>{" "}
          parts, so styling them once restyles all of them.
        </Text>
      </Block>

      <Block title="CSS variables">
        <Text>The provider keeps these in step with the active mode. Use them in your CSS or in a look.</Text>
        <Table
          label="CSS variables"
          head={["Variable", "Value"]}
          rows={[
            ["--theme-primary", "The primary color."],
            ["--theme-primary-gradient", "A lighter shade of primary, for gradients."],
            ["--theme-primary-from, --theme-primary-to", "The ends of the primary button gradient."],
            ["--theme-secondary", "The secondary color."],
            ["--theme-text, --theme-background, --theme-border", "Base colors."],
            ["--theme-header-background, --theme-header-border", "Header and sidebar colors."],
            ["--theme-soft", "A slightly shifted background."],
          ]}
        />
      </Block>

      <Block title="Style your own components">
        <Text>
          <C>useVariant(component, themeVariant)</C> returns the styles a look defines for a
          part, and <C>cx()</C> joins class names. For custom form fields, <C>useFieldStyles()</C>{" "}
          and <C>Field</C> give you the same label and field styles as the built-in inputs.
        </Text>
        <CodeBlock label="useVariant">{`function Panel({ themeVariant, className }: { themeVariant?: string; className?: string }) {
  const themed = useVariant("surface", themeVariant)("root");
  return <div className={cx("p-4", themed.className, className)} style={themed.style} />;
}`}</CodeBlock>
      </Block>
    </>
  );
}
