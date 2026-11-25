import type { ComponentType } from "react";
import {
  ButtonsDemo,
  ControlsDemo,
  FeedbackDemo,
  InteractionDemo,
  NavigationDemo,
  OverlaysDemo,
} from "./demos";
import { DropdownDemo, FieldsDemo, LayoutDemo } from "./moreDemos";
import { Block, C, Table, type DemoProps } from "./ui";

interface Group {
  id: string;
  label: string;
  description: string;
  Demo: ComponentType<DemoProps>;
  /** [component, main props] */
  props: [string, string][];
}

function Overlays({ look }: DemoProps) {
  return (
    <div className="flex flex-col gap-4">
      <OverlaysDemo look={look} />
      <DropdownDemo look={look} />
    </div>
  );
}

export const groups: Group[] = [
  {
    id: "buttons",
    label: "Buttons",
    description: "Four variants and three sizes.",
    Demo: ButtonsDemo,
    props: [["Button", "variant: primary | secondary | outline | ghost; size: sm | md | lg; any button attribute"]],
  },
  {
    id: "fields",
    label: "Fields",
    description: "Plain form fields that you control. For built-in form state and validation, use Unicornial inputs.",
    Demo: FieldsDemo,
    props: [
      ["Input, Password, TextArea", "native attributes; label; variant: default | filled | underline; Input also takes endAdornment"],
      ["Select", "options; value or defaultValue; onChange(value); placeholder; label or aria-label"],
      ["DatePicker", "value (YYYY-MM-DD); onChange(date); format; locale; weekStartsOn; min; max"],
      ["ColorPicker", "value (#rrggbb); onChange(hex); format: hex | rgb | hsl | oklch, for display only"],
      ["FileInput", "accept; multiple; onChange(files); buttonText; placeholder"],
      ["ImageInput", "accept; maxSize in bytes; onChange(file or null); drag and drop with preview"],
    ],
  },
  {
    id: "controls",
    label: "Controls",
    description: "Switches, choices, ranges and progress.",
    Demo: ControlsDemo,
    props: [
      ["Switch", "checked or defaultChecked; onChange(checked); label"],
      ["Radio, RadioGroup", "group: options; value; onChange(value); orientation"],
      ["Slider", "value; min; max; step; showValue; formatValue; trackBackground; onChange(number)"],
      ["Spinner", "value; min; max; step; onChange(number)"],
      ["ProgressBar", "value; max; label; showValue; indeterminate"],
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    description: "Inline alerts, toasts and confirmation dialogs.",
    Demo: FeedbackDemo,
    props: [
      ["Alert", "variant: info | success | warning | error"],
      ["showToast", "(message, color?, onClick?, duration?, themeVariant?); duration 0 keeps it open; returns { id, close }"],
      ["showAlert", "(type, message, themeVariant?); resolves true or false; chain onConfirm and onReject"],
    ],
  },
  {
    id: "overlays",
    label: "Overlays",
    description: "Modals, drawers, tooltips and anchored panels.",
    Demo: Overlays,
    props: [
      ["showModal", "(title, content, onClose?, themeVariant?)"],
      ["showDrawer", "(title, content, onClose?, themeVariant?, side?); side: left | right | top | bottom"],
      ["Tooltip", "anchorRef; open; position: top | bottom | left | right; arrow. You control when it opens."],
      ["Dropdown", "anchorRef; open; onClose; position; align: start | center | end; matchWidth"],
      ["instantiate", "(content) renders your own dialog into the portal; content can receive { close, update, id }"],
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    description: "Tabs, accordions and a collapsible sidebar. This page's own sidebar is the library's Sidebar.",
    Demo: NavigationDemo,
    props: [
      ["Tabs, Tabs.Item", "variant: underline | pills; orientation; onChange(index). It renders the tabs; you render the panel."],
      ["Accordion, Accordion.Item", "type: single | multiple; value or defaultValue (string[]); onValueChange; items take value, title, disabled"],
      ["Sidebar", "collapsed or defaultCollapsed; onCollapsedChange. Sidebar.Header: title, collapsible. Sidebar.Button: icon, active. Needs a parent with a height."],
    ],
  },
  {
    id: "layout",
    label: "Layout",
    description: "Page structure: header, footer, surfaces and placeholders.",
    Demo: LayoutDemo,
    props: [
      ["Header", "behaviour: default | sticky | hide; variant: default | blur. It's positioned, so add top padding below it."],
      ["Header.Logo", "src; darkSrc; alt; title; titleAs (default span)"],
      ["Header.NavButton", "href, or as and to for a router link"],
      ["Footer", "Footer.Brand: logo, title. Footer.Column: title. Footer.Link: href, or as and to."],
      ["Wireframe", "Wireframe.Row; Wireframe.Block: shape: text | box | pill; tone: outline | fill; width; height"],
      ["Surface", "div attributes"],
      ["Separator", "variant: line | point; orientation; color; thickness; spacing"],
      ["Background", "variant: dots-grid | dots-isometric | grid | diamond | grid-45 | lines; mask: none | fade-in | fade-out; color; size. The pattern is fixed behind the content: give the component a transform to keep it inside its box."],
    ],
  },
  {
    id: "interaction",
    label: "Interaction",
    description: "Touch gestures and HTTP wrappers.",
    Demo: InteractionDemo,
    props: [
      ["Gestures", "onTap; onDoubleTap; onSwipeLeft, Right, Up, Down; swipeThreshold; doubleTapDelay; tapMaxMove"],
      ["get, post, put, patch, del", "(route, data?, requireAuth?); they use env.apiUrl and throw HttpError"],
      ["MobileOnly, DesktopOnly", "render children by orientation (portrait or landscape), not by width"],
    ],
  },
];

export function PropsTable({ group }: { group: Group }) {
  return (
    <Block title="Main props">
      <Table label={`${group.label} props`} head={["Name", "Props and arguments"]} rows={group.props} />
      <p className="text-sm opacity-70">
        Most components also accept <C>themeVariant</C>. Each exports its full type as{" "}
        <C>{"<Name>Props"}</C>.
      </p>
    </Block>
  );
}
