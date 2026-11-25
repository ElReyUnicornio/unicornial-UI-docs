import { Button, showToast, unicornialConfig, useTheme } from "unicornial-ui";
import { Block, C, Card, CodeBlock, Row, Table, Text } from "./ui";

const swatches = ["#7642ef", "#0369a1", "#047857", "#be185d"];

function ColorDemo() {
  const { colors, dark, setColors, setDark, setDarkMode } = useTheme();
  const active = dark.enabled ? dark.colors.primary : colors.primary;

  const setPrimary = (primary: string) => {
    setColors({ primary });
    setDark({ colors: { primary } });
  };
  const reset = () => {
    setColors({ primary: unicornialConfig.theme.colors.primary });
    setDark({ colors: { primary: unicornialConfig.theme.dark.colors.primary } });
  };

  return (
    <Card title="Try it" description="This changes the theme of the whole site. Reset brings back the defaults.">
      <Row>
        {swatches.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Use ${color} as the primary color`}
            aria-pressed={active === color}
            onClick={() => setPrimary(color)}
            className="size-11 cursor-pointer rounded-full border-2 border-border aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-text"
            style={{ backgroundColor: color }}
          />
        ))}
        <Button type="button" variant="outline" onClick={reset}>Reset</Button>
      </Row>
      <Row>
        <Button type="button">Primary button</Button>
        <Button type="button" variant="outline" onClick={() => setDarkMode(!dark.enabled)}>
          Switch to {dark.enabled ? "light" : "dark"} mode
        </Button>
        <Button type="button" variant="ghost" onClick={() => showToast("Theme toast", "info")}>Show toast</Button>
      </Row>
    </Card>
  );
}

export default function Theme() {
  const { colors, dark, text } = unicornialConfig.theme;
  const colorKeys = ["primary", "secondary", "text", "background", "border"] as const;

  return (
    <>
      <Block title="Configure the provider">
        <Text>
          Pass <C>config</C> to <C>ThemeProvider</C>. It has two parts, <C>theme</C> (how things
          look) and <C>env</C> (runtime values). Include only what you want to change; the rest
          keeps its default.
        </Text>
        <CodeBlock label="theme config">{`<ThemeProvider
  config={{
    theme: {
      colors: { primary: "#0369a1" },
      dark: { colors: { primary: "#38bdf8" } },
      notifications: { position: "bottom-right" },
    },
    env: { apiUrl: "https://api.example.com" },
  }}
>
  <App />
</ThemeProvider>`}</CodeBlock>
        <Text>
          The provider reads <C>config</C> only when it mounts. To change the theme afterwards,
          use the setters from <C>useTheme()</C>.
        </Text>
      </Block>

      <Block title="Colors">
        <Text>
          <C>theme.colors</C> applies in light mode and <C>theme.dark.colors</C> in dark mode.
        </Text>
        <Table
          label="Default colors"
          head={["Key", "Light", "Dark"]}
          rows={[
            ...colorKeys.map((key) => [key, colors[key], dark.colors[key]]),
            ["header.background", colors.header.background, dark.colors.header.background],
            ["header.border", colors.header.border, dark.colors.header.border],
          ]}
        />
        <ColorDemo />
      </Block>

      <Block title="Dark mode">
        <Text>
          Set <C>theme.dark.enabled</C> to start in dark mode, and call <C>setDarkMode()</C> to
          switch. The library doesn't follow the system setting by itself. To start with it,
          read the media query before you render.
        </Text>
        <CodeBlock label="dark mode">{`const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

<ThemeProvider config={{ theme: { dark: { enabled: prefersDark } } }}>
  <App />
</ThemeProvider>

// anywhere inside the provider
const { dark, setDarkMode } = useTheme();
setDarkMode(!dark.enabled);`}</CodeBlock>
      </Block>

      <Block title="Text and notifications">
        <Text>
          <C>theme.text</C> holds Tailwind class strings that you can reuse for headings and
          paragraphs through <C>useTheme().text</C>.
        </Text>
        <Table
          label="Text defaults"
          head={["Key", "Default classes"]}
          rows={Object.entries(text).map(([key, value]) => [key, value])}
        />
        <Text>
          <C>theme.notifications.position</C> sets where toasts appear: <C>top-left</C>,{" "}
          <C>top</C>, <C>top-right</C> (default), <C>bottom-left</C>, <C>bottom</C> or{" "}
          <C>bottom-right</C>.
        </Text>
      </Block>

      <Block title="useTheme()">
        <Table
          label="useTheme values"
          head={["Name", "What it is"]}
          rows={[
            ["colors, dark, text, notifications, variants", "The current theme values."],
            ["currentColors", "The colors of the active mode."],
            ["env", "The env values."],
            ["enabled", "true when a ThemeProvider is mounted."],
            ["setColors(colors)", "Changes the light colors."],
            ["setDark(dark)", "Changes the dark settings, including dark.colors."],
            ["setDarkMode(boolean)", "Turns dark mode on or off."],
            ["setText, setNotifications", "Change those parts of the theme."],
            ["setVariant(name, variant)", "Adds or extends a look."],
            ["setTheme(partial), setEnv(partial)", "Merge any part of the theme or env."],
          ]}
        />
      </Block>

      <Block title="API requests">
        <Text>
          <C>get</C>, <C>post</C>, <C>put</C>, <C>patch</C> and <C>del</C> add{" "}
          <C>env.apiUrl</C> to the route. They send JSON, or a query string for GET and DELETE.
          With <C>requireAuth</C> they send <C>localStorage.token</C> as a Bearer token. A
          response outside the 2xx range throws <C>HttpError</C> with <C>status</C> and{" "}
          <C>body</C>.
        </Text>
        <CodeBlock label="request">{`const user = await get<User>("/me", undefined, true);
await post("/posts", { title: "Hello" }, true);`}</CodeBlock>
      </Block>
    </>
  );
}
