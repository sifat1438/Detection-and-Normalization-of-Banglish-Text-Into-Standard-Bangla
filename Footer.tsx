import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                <span className="text-white text-sm font-bold font-bengali">বা</span>
              </div>
              <span className="font-semibold text-[var(--foreground)]">Banglish to Standard Bangla</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xs">
              An AI/NLP research prototype for detecting and normalizing Romanized Bangla into standard Unicode Bangla text.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)] text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              Academic Research Prototype
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2">
              {[
                ["Converter", "/converter"],
                ["How It Works", "/how-it-works"],
                ["Research", "/research"],
                ["Performance", "/performance"],
                ["Error Analysis", "/error-analysis"],
                ["Demo Playground", "/demo"],
                ["About", "/about"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Researcher */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider mb-3">Researcher</h4>
            <div className="space-y-1">
              <p className="text-sm font-medium text-[var(--foreground)]">Sal Sabily Sifath</p>
              <p className="text-xs font-mono text-[var(--muted-foreground)]">ID: 0242220005101438</p>
              <p className="text-sm text-[var(--muted-foreground)]">Computer Science & Engineering</p>
              <p className="text-sm text-[var(--muted-foreground)]">Daffodil International University</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["GitHub", "LinkedIn", "Paper"].map((label) => (
                <span
                  key={label}
                  className="px-2.5 py-1 text-xs rounded-md border border-[var(--border)] text-[var(--muted-foreground)] cursor-not-allowed opacity-60"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted-foreground)]">
            © 2024 Banglish to Standard Bangla. Academic Research Project.
          </p>
          <p className="text-xs text-[var(--muted-foreground)] font-mono">
            NLP · Sequence-to-Sequence · Bangla NLP
          </p>
        </div>
      </div>
    </footer>
  );
}
