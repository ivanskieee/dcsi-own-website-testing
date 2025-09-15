import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Offers from "./pages/Offers";
import Contacts from "./pages/Contacts";
import DcsiLogo from "@/assets/dcsi-logo.png";
import { PageEffectsProvider } from "@/components/main/usePageEffects";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";

const NavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md font-medium transition-colors ${isActive
    ? "bg-foreground text-background"
    : "text-muted-foreground hover:text-foreground"
  }`;

// Dark mode toggle switch
const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [appliedTheme, setAppliedTheme] = useState<"light" | "dark">(
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
  );

  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) =>
        setAppliedTheme(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      setAppliedTheme(theme);
    }
  }, [theme]);

  return (
    <Switch
      checked={appliedTheme === "dark"}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      className="ml-4"
    />
  );
};

const AppContent: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-background/90 backdrop-blur-sm border-b border-muted/20">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            {/* Brand */}
            <NavLink to="/" className="flex items-center">
              <img
                src={DcsiLogo}
                alt="DCSI Logo"
                className="h-15 w-15 object-contain dark:invert"
              />
              <div>
                <div className="text-lg font-extrabold text-foreground">DCSI</div>
                <div className="text-xs text-muted-foreground -mt-1">
                  DataLink Creative Solutions
                </div>
              </div>
            </NavLink>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/" className={({ isActive }) => NavLinkClass({ isActive })}>
                Home
              </NavLink>
              <NavLink to="/offers" className={({ isActive }) => NavLinkClass({ isActive })}>
                Offers
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => NavLinkClass({ isActive })}>
                Contact
              </NavLink>
              <DarkModeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <DarkModeToggle />
              <button
                aria-label="Toggle menu"
                onClick={() => setOpen((v) => !v)}
                className="p-2 rounded-md border border-muted/20"
              >
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {open ? (
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden border-t border-muted/20">
            <div className="px-4 py-3 space-y-2">
              <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => NavLinkClass({ isActive })}>
                Home
              </NavLink>
              <NavLink to="/offers" onClick={() => setOpen(false)} className={({ isActive }) => NavLinkClass({ isActive })}>
                Offers
              </NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => NavLinkClass({ isActive })}>
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <PageEffectsProvider>
        <main className="bg-background text-foreground min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/contact" element={<Contacts />} />
          </Routes>
        </main>
      </PageEffectsProvider>

      {/* Footer */}
      <footer className="bg-background text-foreground border-t border-muted/20">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} DataLink Creative Solutions Incorporation</div>
          <div className="mt-3 md:mt-0">Designed by DCSI • All rights reserved</div>
        </div>
      </footer>
    </>
  );
};

// Wrap with ThemeProvider
const App: React.FC = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AppContent />
  </ThemeProvider>
);

export default App;
