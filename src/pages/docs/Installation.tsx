import { Link } from "react-router-dom";
import { Block, C, CodeBlock, Table, Text } from "./ui";

export default function Installation() {
  return (
    <>
      <Block title="Requirements">
        <Text>
          Unicornial UI needs React and React DOM, version 18 or 19. It has no runtime
          dependencies, and your app doesn't need Tailwind CSS.
        </Text>
      </Block>

      <Block title="Install the package">
        <CodeBlock label="npm command">npm i unicornial-ui</CodeBlock>
        <CodeBlock label="pnpm command">pnpm add unicornial-ui</CodeBlock>
        <CodeBlock label="yarn command">yarn add unicornial-ui</CodeBlock>
      </Block>

      <Block title="Add the ThemeProvider">
        <Text>
          Wrap your app once. The provider sets the theme's CSS variables, toggles the{" "}
          <C>dark</C> class on <C>{"<html>"}</C> and mounts the portal where modals, drawers,
          alerts and toasts appear.
        </Text>
        <CodeBlock label="main.tsx">{`import { createRoot } from "react-dom/client";
import { ThemeProvider } from "unicornial-ui";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);`}</CodeBlock>
        <Text>
          Components render without the provider, using the default theme. But theme setters do
          nothing and <C>showModal()</C>, <C>showToast()</C> and the other floating helpers
          have nowhere to appear.
        </Text>
      </Block>

      <Block title="Styles">
        <Text>
          Importing anything from the package also loads its CSS. If your setup doesn't pick it
          up, import the stylesheet yourself.
        </Text>
        <CodeBlock label="stylesheet import">{`import "unicornial-ui/style.css";`}</CodeBlock>
        <Text>
          Import every component from the package root. If your own CSS has to override library
          classes, import it after <C>unicornial-ui</C>.
        </Text>
      </Block>

      <Block title="Use your first components">
        <CodeBlock label="App.tsx">{`import { Button, showToast } from "unicornial-ui";

export default function App() {
  return <Button onClick={() => showToast("It works", "success")}>Say hello</Button>;
}`}</CodeBlock>
      </Block>

      <Block title="Next steps">
        <Table
          label="Next steps"
          plain
          head={["Page", "What you'll find"]}
          rows={[
            [<Link key="l" className="underline" to="/docs/theme">Theme</Link>, "Colors, dark mode, text styles and notifications."],
            [<Link key="l" className="underline" to="/docs/styling">Styling</Link>, "The glass look, your own looks and CSS variables."],
            [<Link key="l" className="underline" to="/docs/components">Components</Link>, "Live examples with their main props."],
            [<Link key="l" className="underline" to="/docs/unicornial-inputs">Unicornial inputs</Link>, "Form fields with built-in state and validation."],
          ]}
        />
      </Block>
    </>
  );
}
