import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Offers from "./pages/Offers";

const NavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md font-medium transition-colors ${
    isActive ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
  }`;

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <header className="bg-background/90 backdrop-blur-sm border-b border-muted/20">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            {/* Left: Brand */}
            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-md p-2 bg-foreground/5">
                {/* optional small logo mark */}
              </div>
              <div>
                <div className="text-lg font-extrabold text-foreground">DCSI</div>
                <div className="text-xs text-muted-foreground -mt-1">DataLink Creative Solutions</div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) => NavLinkClass({ isActive })}
              >
                Home
              </NavLink>

              <NavLink
                to="/offers"
                className={({ isActive }) => NavLinkClass({ isActive })}
              >
                Offers
              </NavLink>

              <Link
                to="/#contact"
                className="px-3 py-2 rounded-md font-medium bg-foreground text-background shadow-sm hover:brightness-95 transition"
              >
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
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
              <Link to="/#contact" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md bg-foreground text-background">
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="bg-background text-foreground min-h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </main>

      {/* small footer to tie design together */}
      <footer className="bg-foreground text-background border-t border-muted/20">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <div>© {new Date().getFullYear()} DataLink Creative Solutions Incorporation</div>
          <div className="mt-3 md:mt-0">Designed by DCSI • All rights reserved</div>
        </div>
      </footer>
    </BrowserRouter>
  );
};

export default App;
