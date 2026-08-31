import { useState } from "react";

type Category = "casual" | "code-mixed" | "short" | "long" | "ambiguous";

interface Example {
  category: Category;
  label: string;
  input: string;
  expected: string;
  note?: string;
}

const EXAMPLES: Example[] = [
  {
    category: "casual",
    label: "Casual Greeting",
    input: "ki khobor? kemon acho tumi?",
    expected: "কি খবর? কেমন আছো তুমি?",
  },
  {
    category: "casual",
    label: "Casual Message",
    input: "ami ajke bari jabo raat e",
    expected: "আমি আজকে বাড়ি যাব রাতে।",
  },
  {
    category: "code-mixed",
    label: "Code-Mixed Sentence",
    input: "ami class e presentation dibo",
    expected: "আমি ক্লাসে প্রেজেন্টেশন দিব।",
    note: "English words 'class' and 'presentation' are retained or transliterated.",
  },
  {
    category: "code-mixed",
    label: "Code-Mixed Daily",
    input: "online class ache kal subhe",
    expected: "অনলাইন ক্লাস আছে কাল সকালে।",
  },
  {
    category: "short",
    label: "Short Sentence",
    input: "ami bhalo achi",
    expected: "আমি ভালো আছি।",
  },
  {
    category: "short",
    label: "Short Question",
    input: "tumi ki kheyecho?",
    expected: "তুমি কি খেয়েছো?",
  },
  {
    category: "long",
    label: "Long Sentence",
    input: "ami ajke university jete parini karon rasta te jam chilo, tai ami barite bose online e class koreci",
    expected: "আমি আজকে বিশ্ববিদ্যালয়ে যেতে পারিনি কারণ রাস্তায় জ্যাম ছিল, তাই আমি বাড়িতে বসে অনলাইনে ক্লাস করেছি।",
  },
  {
    category: "ambiguous",
    label: "Ambiguous Romanization",
    input: "boro gach er niche boshe achi",
    expected: "বড় গাছের নিচে বসে আছি।",
    note: "'boro' could be 'বড়' or 'বোরো' — context resolves it.",
  },
];

const CATEGORY_LABELS: Record<Category, string> = {
  casual: "Casual Banglish",
  "code-mixed": "Code-Mixed",
  short: "Short Sentence",
  long: "Long Sentence",
  ambiguous: "Ambiguous",
};

const CATEGORY_COLORS: Record<Category, string> = {
  casual: "bg-blue-50 text-blue-700 border-blue-100",
  "code-mixed": "bg-purple-50 text-purple-700 border-purple-100",
  short: "bg-green-50 text-green-700 border-green-100",
  long: "bg-amber-50 text-amber-700 border-amber-100",
  ambiguous: "bg-red-50 text-red-700 border-red-100",
};

const cats: Category[] = ["casual", "code-mixed", "short", "long", "ambiguous"];

type Status = "idle" | "running" | "done";

export default function Demo() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const filtered = activeCategory === "all" ? EXAMPLES : EXAMPLES.filter((e) => e.category === activeCategory);

  async function handleRun(ex: Example) {
    setSelectedExample(ex);
    setStatus("running");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("done");
  }

  async function handleCopy() {
    if (!selectedExample) return;
    await navigator.clipboard.writeText(selectedExample.expected);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-mono text-indigo-600 uppercase tracking-wider mb-3">Interactive Playground</div>
          <h1 className="font-display text-4xl text-[var(--foreground)] mb-4">Demo Playground</h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Explore curated Banglish examples across different categories. Click any example to see how the system converts it to standard Bangla.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          {/* Left — examples */}
          <div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-5">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeCategory === "all"
                    ? "bg-[var(--primary)] text-white border-transparent"
                    : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-indigo-300"
                }`}
              >
                All
              </button>
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    activeCategory === c
                      ? "bg-[var(--primary)] text-white border-transparent"
                      : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-indigo-300"
                  }`}
                >
                  {CATEGORY_LABELS[c]}
                </button>
              ))}
            </div>

            {/* Example cards */}
            <div className="space-y-3">
              {filtered.map((ex) => (
                <div
                  key={ex.input}
                  onClick={() => handleRun(ex)}
                  className={`bg-white rounded-xl border p-5 cursor-pointer hover:shadow-md transition-all ${
                    selectedExample?.input === ex.input ? "border-indigo-300 ring-1 ring-indigo-100" : "border-[var(--border)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-sm text-[var(--foreground)]">{ex.label}</h3>
                    <span className={`flex-shrink-0 text-xs px-2.5 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[ex.category]}`}>
                      {CATEGORY_LABELS[ex.category]}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-[var(--foreground)] bg-[var(--muted)] rounded-lg px-3 py-2 mb-2">
                    {ex.input}
                  </div>
                  {ex.note && (
                    <p className="text-xs text-[var(--muted-foreground)] italic mt-2">{ex.note}</p>
                  )}
                  <div className="mt-3 text-xs text-indigo-600 font-medium">
                    Click to convert →
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — output panel */}
          <div className="sticky top-24 h-fit">
            <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[var(--border)] bg-[var(--muted)]">
                <h2 className="font-semibold text-[var(--foreground)] text-sm">Conversion Output</h2>
              </div>

              {!selectedExample ? (
                <div className="px-5 py-12 text-center">
                  <div className="text-3xl mb-3">→</div>
                  <p className="text-sm text-[var(--muted-foreground)]">Select an example from the list to see the conversion result.</p>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  {/* Input */}
                  <div>
                    <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Input</div>
                    <div className="font-mono text-sm bg-[var(--muted)] rounded-lg px-4 py-3 text-[var(--foreground)]">
                      {selectedExample.input}
                    </div>
                  </div>

                  {/* Status / output */}
                  <div>
                    <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Standard Bangla</div>
                    <div className="min-h-20 rounded-lg bg-indigo-50 border border-indigo-100 px-4 py-4">
                      {status === "running" ? (
                        <div className="flex flex-col gap-2">
                          {["Analyzing", "Detecting", "Converting"].map((s, i) => (
                            <div key={s} className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full border-2 border-indigo-300 border-t-indigo-600 animate-spin" />
                              <span className="text-xs text-indigo-600">{s}…</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="font-bengali text-xl text-[var(--foreground)] leading-relaxed">
                          {selectedExample.expected}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {status === "done" && (
                    <>
                      <div className="flex gap-2">
                        <button
                          onClick={handleCopy}
                          className="flex-1 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                        <button
                          onClick={() => { setSelectedExample(null); setStatus("idle"); }}
                          className="flex-1 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-colors"
                        >
                          Clear
                        </button>
                      </div>

                      {/* Info */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          ["Category", CATEGORY_LABELS[selectedExample.category]],
                          ["Model", "Consensus Ensemble"],
                          ["Input words", selectedExample.input.split(" ").length],
                          ["Status", "✓ Complete"],
                        ].map(([l, v]) => (
                          <div key={l as string} className="rounded-lg bg-[var(--muted)] px-3 py-2">
                            <div className="text-[var(--muted-foreground)]">{l}</div>
                            <div className="font-medium text-[var(--foreground)] mt-0.5">{v}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
