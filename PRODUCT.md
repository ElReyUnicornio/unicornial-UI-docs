# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Developers who build React apps and dashboards and want a ready set of components with a configurable theme, instead of assembling each piece themselves. Confirmed with the owner.

## Product Purpose
unicornial-ui is a React + Tailwind CSS component library, published to npm. It covers layout (Surface, Header, Sidebar, Tabs, Accordion, Background), form fields with validation, feedback (Alert, Modal, Drawer, AlertDialog, Toast, Tooltip, Dropdown) and utilities, so an app can be put together quickly and keep a consistent look. Success is a developer getting a complete, coherent interface with little code.

## Positioning
All-in-one with an imperative API: `showModal`, `showDrawer`, `showAlert` (a promise) and `showToast` can be called from anywhere, including outside React; every form field has a `Unicornial*` version connected to `<Form>` with chainable validators; and `get`/`post`/`put`/`patch`/`del` wrappers read the base url from the config. The look can be swapped per component with `themeVariant` and a typed config.

## Operating Context
Used inside a consumer's React app wrapped in `ThemeProvider`, which owns the theme, a floating portal (`#unicornial-portal`) and the dark-mode class on `<html>`. The repo itself is a Vite showcase (`src/main.tsx`) that renders every component in each look and in light and dark. Built with Vite library mode (ES + UMD), published with pnpm.

## Capabilities and Constraints
- Peer dependencies: React 18 or 19. The React Compiler runs only in dev, never in the published bundle.
- No runtime dependencies (`dependencies` is empty). Styles come from Tailwind 4 and CSS variables (`--theme-*`) set by `ThemeProvider`.
- Configuration is a single `unicornialConfig` with two parts: `theme` (colors, dark, text, notifications, variants) and `env` (`apiUrl`). Variant parts are typed per component (`ComponentParts`).
- Looks that exist today: `default` and `glass` (mode-aware for light and dark). The showcase also lists `neumorph` and `clay`, which have no definition yet (undecided).
- Version is 0.0.x. The README partly describes an older config shape (see Open decisions).

## Brand Commitments
Name: unicornial-ui (config: "unicornial"). The default primary color is `#7642ef` (light) and `#aa3bff` (dark). The `glass` look takes its dark-mode reference from iisu.network (dark translucent panels, thin subtle borders), as the owner asked.

## Evidence on Hand
Real, working showcase (`src/main.tsx`) and logo assets (`src/assets/logo.png`, `src/assets/darklogo.png`). No user research, usage numbers, testimonials or customer list exist; do not invent any.

## Product Principles
1. Public API stays stable: component names, props and config shape change only deliberately and with a note.
2. No runtime dependencies; prefer platform features and Tailwind over adding libraries.
3. Accessible by default in every look and in light and dark: roles, keyboard, visible focus, enough contrast.
4. One config, typed: a look is data in `unicornialConfig`, not forked component code.
5. Imperative helpers must behave the same inside and outside React.

## Accessibility & Inclusion
Required by the owner: accessible by default (ARIA roles, keyboard navigation, focus visibility, contrast) in all looks and both color modes. No formal standard was named; WCAG 2.1 AA is the working target for audits unless the owner says otherwise.

## Open decisions
- Whether `neumorph` and `clay` will be built or removed from the showcase and README.
- Whether to move modals, dropdowns and toasts to native `<dialog>`/popover (explicitly postponed by the owner).
- Update the README to the `{ theme, env }` config shape.
