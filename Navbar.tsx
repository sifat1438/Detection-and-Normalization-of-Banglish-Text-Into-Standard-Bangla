import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Converter", to: "/converter" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Research", to: "/research" },
  { label: "Performance", to: "/performance" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold font-bengali">বা</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[var(--foreground)] tracking-tight">Banglish → Bangla</span>
              <span className="text-[10px] text-[var(--muted-foreground)] font-mono">Research Prototype</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  location.pathname === l.to
                    ? "bg-[var(--secondary)] text-[var(--secondary-foreground)] font-medium"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/converter"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Try Converter
            </Link>
            <button
              className="md:hidden p-2 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[var(--border)] py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 text-sm rounded-md transition-colors ${
                  location.pathname === l.to
                    ? "bg-[var(--secondary)] text-[var(--secondary-foreground)] font-medium"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/converter"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium"
            >
              Try Converter
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
