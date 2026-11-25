import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "unicornial-ui";
import { Landing } from "./pages/Landing";
// after unicornial-ui, so the app's Tailwind utilities win over the library's
import "./index.css";

// the docs page is a separate chunk, so the landing doesn't download it
const Docs = lazy(() => import("./pages/Docs"));

/** `?mode=dark|light` wins; otherwise follow the system setting. */
function initialDark() {
  const mode = new URLSearchParams(window.location.search).get("mode");
  return mode ? mode === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider config={{ theme: { dark: { enabled: initialDark() } } }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/docs/:section?/:item?" element={<Suspense fallback={<p role="status" className="p-6">Loading docs…</p>}><Docs /></Suspense>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
