import { Link } from "react-router-dom";
import vocabWordCloud from "@/imports/image.png";

const features = [
  {
    icon: "🔍",
    title: "Banglish Detection",
    desc: "Automatically identifies Romanized Bangla tokens in mixed-language text using character-level modeling.",
  },
  {
    icon: "⚙️",
    title: "NLP Normalization Pipeline",
    desc: "Multi-stage pipeline — detection, token identification, transliteration, and post-processing.",
  },
  {
    icon: "🤖",
    title: "Character-Level Transformer",
    desc: "Neural sequence-to-sequence model trained on curated Banglish–Bangla parallel corpus.",
  },
  {
    icon: "🎯",
    title: "Consensus Ensemble",
    desc: "Best system: 85.70 BLEU, 90.85 chrF++, 6.13 CER — combining multiple model outputs.",
  },
  {
    icon: "📊",
    title: "Research-Grade Evaluation",
    desc: "Evaluated on BLEU, chrF++, Exact Match, TER, WER, and CER metrics.",
  },
  {
    icon: "🌐",
    title: "Unicode Standard Output",
    desc: "Produces properly encoded Unicode Bangla — ready for downstream NLP applications.",
  },
];

const steps = [
  { n: "01", label: "Banglish Input", desc: "User provides Romanized Bangla text" },
  { n: "02", label: "Detection", desc: "System identifies Banglish tokens" },
  { n: "03", label: "Token Identification", desc: "Character-level language tagging" },
  { n: "04", label: "Normalization", desc: "Transformer converts tokens to Bangla" },
  { n: "05", label: "Unicode Output", desc: "Clean standard Bangla text returned" },
];

const usecases = [
  { label: "Social Media", desc: "Normalize Banglish posts to standard Bangla for content analysis." },
  { label: "Search Engines", desc: "Improve Bangla information retrieval by standardizing queries." },
  { label: "NLP Preprocessing", desc: "Feed normalized text into Bangla NLP pipelines." },
  { label: "Digital Archiving", desc: "Convert informal text to archivable Unicode Bangla." },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-white pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                Research Prototype · Daffodil International University
              </div>

              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl text-[var(--foreground)] leading-tight mb-5">
                Turn Banglish into
                <span className="text-[var(--primary)] italic"> Standard Bangla</span>
                <span> with AI</span>
              </h1>

              <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8 max-w-lg">
                An AI-powered research prototype for detecting and normalizing Banglish text into clear, standard Unicode Bangla — built on a character-level Transformer and consensus ensemble.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/converter"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-indigo-700 transition-colors"
                >
                  Try the Converter
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-medium hover:bg-[var(--muted)] transition-colors"
                >
                  Explore the Research
                </Link>
              </div>

              <div className="mt-10 flex gap-8">
                {[
                  ["85.70", "BLEU Score"],
                  ["90.85", "chrF++"],
                  ["6.13", "CER"],
                ].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="text-2xl font-bold text-[var(--foreground)] font-display">{val}</div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Hero conversion card */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white shadow-lg overflow-hidden">
                <div className="bg-[var(--muted)] px-4 py-3 flex items-center gap-2 border-b border-[var(--border)]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-300" />
                    <div className="w-3 h-3 rounded-full bg-yellow-300" />
                    <div className="w-3 h-3 rounded-full bg-green-300" />
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] font-mono ml-1">banglish-converter</span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Input */}
                  <div>
                    <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Banglish Input</div>
                    <div className="rounded-lg bg-[var(--muted)] px-4 py-3 font-mono text-sm text-[var(--foreground)] border border-[var(--border)]">
                      ami ajke university jabo
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-[var(--border)]" />
                    <div className="flex flex-col items-center gap-1">
                      <div className="px-3 py-1.5 rounded-full bg-[var(--primary)] text-white text-xs font-medium">
                        Convert →
                      </div>
                      <div className="flex gap-1">
                        <span className="text-[10px] font-mono text-[var(--muted-foreground)]">CharTransformer</span>
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-[var(--border)]" />
                  </div>

                  {/* Output */}
                  <div>
                    <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Standard Bangla</div>
                    <div className="rounded-lg bg-indigo-50 border border-indigo-100 px-4 py-3">
                      <p className="font-bengali text-xl text-[var(--foreground)] leading-relaxed">
                        আমি আজকে বিশ্ববিদ্যালয়ে যাব।
                      </p>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[var(--muted-foreground)] font-mono">5 words · 220ms</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 font-medium">
                      ✓ Converted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-[var(--foreground)] mb-3">Key Features</h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              Built on NLP research — combining rule-based systems, statistical models, and neural transformers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-[var(--border)] p-6 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-[var(--foreground)] mb-3">How It Works</h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              A multi-stage NLP pipeline from noisy Banglish input to clean Unicode Bangla output.
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-[var(--border)]" />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {steps.map((s, i) => (
                <div key={s.n} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[var(--primary)] text-white font-mono text-sm font-bold flex items-center justify-center mb-3 shadow-sm">
                    {s.n}
                  </div>
                  <h4 className="font-semibold text-sm text-[var(--foreground)] mb-1">{s.label}</h4>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="lg:hidden mt-4 text-[var(--muted-foreground)]">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link to="/how-it-works" className="text-sm text-[var(--primary)] font-medium hover:underline">
              View detailed pipeline →
            </Link>
          </div>
        </div>
      </section>

      {/* Research highlight — corpus word clouds */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Dataset</div>
              <h2 className="font-display text-3xl lg:text-4xl text-[var(--foreground)] mb-5">
                Built on a Real Banglish–Bangla Parallel Corpus
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                The model is trained on a curated parallel corpus of Romanized Banglish sentences paired with their standard Unicode Bangla equivalents. The word clouds visualize the most frequent vocabulary on both sides of the corpus.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Diverse vocabulary including casual, social-media, and code-mixed Banglish",
                  "Bangla references normalized to Unicode NFC encoding",
                  "80 / 10 / 10 train / validation / test split",
                ].map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-[var(--muted-foreground)]">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">→</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                to="/research"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--primary)] text-[var(--primary)] font-medium text-sm hover:bg-indigo-50 transition-colors"
              >
                View Full Methodology
              </Link>
            </div>

            {/* Right — word cloud card */}
            <div className="rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm bg-white">
              <div className="px-5 py-4 border-b border-[var(--border)] flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--foreground)]">Corpus Vocabulary</span>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                    <span className="w-2 h-2 rounded-sm bg-teal-400 inline-block" />
                    Banglish
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                    <span className="w-2 h-2 rounded-sm bg-orange-400 inline-block" />
                    Bangla
                  </span>
                </div>
              </div>
              <div className="bg-[#0a0a0a] p-4">
                <img
                  src={vocabWordCloud}
                  alt="Side-by-side word clouds: Banglish source vocabulary (left) with words like chilo, valo, kore; Bangla target vocabulary (right) with Bengali script words like একদম, এখন, সব"
                  className="w-full rounded-lg object-contain"
                  style={{ maxHeight: 260 }}
                />
              </div>
              <div className="px-5 py-3 bg-[var(--muted)] text-xs text-[var(--muted-foreground)]">
                Word size reflects relative frequency in the corpus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance highlight */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Research Results</div>
              <h2 className="font-display text-3xl lg:text-4xl text-[var(--foreground)] mb-5">
                State-of-the-Art Results on Banglish Normalization
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
                Our Consensus Ensemble achieves 85.70 BLEU and 90.85 chrF++, significantly outperforming rule-based and statistical baselines. The CharTransformer alone achieves 83.42 BLEU.
              </p>
              <Link to="/performance" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--primary)] text-[var(--primary)] font-medium text-sm hover:bg-indigo-50 transition-colors">
                View Full Results
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { sys: "Consensus Ensemble", bleu: "85.70", chrf: "90.85", cer: "6.13", best: true },
                { sys: "CharTransformer", bleu: "83.42", chrf: "87.24", cer: "9.32", best: false },
                { sys: "Statistical + Rules", bleu: "14.80", chrf: "42.68", cer: "40.77", best: false },
                { sys: "Rule-based", bleu: "3.85", chrf: "32.51", cer: "41.68", best: false },
              ].map((m) => (
                <div key={m.sys} className={`rounded-xl p-4 border ${m.best ? "bg-indigo-50 border-indigo-200" : "bg-white border-[var(--border)]"}`}>
                  {m.best && (
                    <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">Best System</span>
                  )}
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 mb-2 leading-tight">{m.sys}</p>
                  <div className="text-2xl font-bold text-[var(--foreground)] font-display">{m.bleu}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">BLEU Score</div>
                  <div className="mt-2 flex gap-3 text-xs">
                    <span className="text-[var(--muted-foreground)]">chrF++ <strong className="text-[var(--foreground)]">{m.chrf}</strong></span>
                    <span className="text-[var(--muted-foreground)]">CER <strong className="text-[var(--foreground)]">{m.cer}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-white border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-[var(--foreground)] mb-3">Use Cases</h2>
            <p className="text-[var(--muted-foreground)] max-w-lg mx-auto">Applications of Banglish normalization in real-world NLP systems.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {usecases.map((u) => (
              <div key={u.label} className="rounded-xl border border-[var(--border)] p-5">
                <h3 className="font-semibold text-sm text-[var(--foreground)] mb-2">{u.label}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Researcher */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl text-[var(--foreground)] mb-10">The Researcher</h2>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 font-display">S</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Sal Sabily Sifath</h3>
              <p className="text-xs font-mono text-[var(--muted-foreground)] mt-1">ID: 0242220005101438</p>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">Computer Science & Engineering</p>
              <p className="text-sm font-medium text-indigo-600 mt-0.5">Daffodil International University</p>
              <p className="text-sm text-[var(--muted-foreground)] mt-4 leading-relaxed max-w-md mx-auto">
                This project was developed as part of a thesis research on Banglish-to-Bangla detection and normalization using NLP and neural sequence-to-sequence modeling.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                {["GitHub", "LinkedIn", "Research Paper", "Thesis"].map((lbl) => (
                  <span key={lbl} className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm text-[var(--muted-foreground)] cursor-not-allowed opacity-60">
                    {lbl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
