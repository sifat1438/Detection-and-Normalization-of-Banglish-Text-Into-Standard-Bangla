import { useState } from "react";

const EXAMPLES = [
  "ami ajke university jabo",
  "tumi ki kheyecho?",
  "amar khub bhalo lagche",
  "sobठीk ache, tension korona",
  "raat 10 ta te class ache",
];

type Status = "idle" | "analyzing" | "detecting" | "normalizing" | "generating" | "done" | "error";

const STAGE_LABELS: Record<Status, string> = {
  idle: "",
  analyzing: "Analyzing text…",
  detecting: "Detecting Banglish tokens…",
  normalizing: "Normalizing…",
  generating: "Generating Bangla…",
  done: "Conversion complete",
  error: "Error occurred",
};

const MOCK_OUTPUTS: Record<string, string> = {
  "ami ajke university jabo": "আমি আজকে বিশ্ববিদ্যালয়ে যাব।",
  "ami ajke class e jabo": "আমি আজকে ক্লাসে যাব।",
  "tumi ki kheyecho?": "তুমি কি খেয়েছো?",
  "amar khub bhalo lagche": "আমার খুব ভালো লাগছে।",
  "raat 10 ta te class ache": "রাত ১০টায় ক্লাস আছে।",
};

function getMockOutput(input: string): string {
  const trimmed = input.trim().toLowerCase();
  if (MOCK_OUTPUTS[trimmed]) return MOCK_OUTPUTS[trimmed];
  return "[ মডেল আউটপুট এখানে প্রদর্শিত হবে। ]";
}

export default function Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const wordCount = (t: string) => t.trim() ? t.trim().split(/\s+/).length : 0;

  async function handleConvert() {
    if (!input.trim()) return;
    const start = Date.now();
    const stages: Status[] = ["analyzing", "detecting", "normalizing", "generating"];
    for (const s of stages) {
      setStatus(s);
      await new Promise((r) => setTimeout(r, 400));
    }
    setOutput(getMockOutput(input));
    setProcessingTime(Date.now() - start);
    setStatus("done");
  }

  function handleClear() {
    setInput("");
    setOutput("");
    setStatus("idle");
    setProcessingTime(null);
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bangla-output.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      // clipboard access denied
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs font-mono text-[var(--muted-foreground)] px-2 py-0.5 rounded bg-[var(--muted)] border border-[var(--border)]">
              v1.0-research
            </div>
            <div className="text-xs text-[var(--muted-foreground)]">Powered by CharTransformer + Consensus Ensemble</div>
          </div>
          <h1 className="font-display text-3xl text-[var(--foreground)]">Banglish to Bangla Converter</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Type or paste Romanized Bangla text and convert it to standard Unicode Bangla.</p>
        </div>

        {/* Example pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs text-[var(--muted-foreground)] self-center">Examples:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setInput(ex); setOutput(""); setStatus("idle"); }}
              className="px-3 py-1 rounded-full border border-[var(--border)] text-xs text-[var(--foreground)] hover:border-indigo-300 hover:bg-indigo-50 transition-colors font-mono"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Main panels */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 items-start">
          {/* Left — Input */}
          <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]">
              <span className="text-sm font-semibold text-[var(--foreground)]">Banglish Input</span>
              <div className="flex gap-2">
                <button
                  onClick={handlePaste}
                  className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-white transition-colors"
                >
                  Paste
                </button>
                <button
                  onClick={() => { setInput(""); setStatus("idle"); }}
                  className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-white transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste your Banglish text here…&#10;&#10;Example: ami ajke class e jabo"
              className="w-full h-64 px-4 py-4 text-sm font-mono text-[var(--foreground)] placeholder-[var(--muted-foreground)] bg-white resize-none outline-none leading-relaxed"
            />
            <div className="px-4 py-2 border-t border-[var(--border)] flex gap-4 text-xs text-[var(--muted-foreground)] bg-[var(--muted)]">
              <span>{input.length} chars</span>
              <span>{wordCount(input)} words</span>
            </div>
          </div>

          {/* Center — Convert button */}
          <div className="flex lg:flex-col items-center justify-center gap-3 py-4">
            <button
              onClick={handleConvert}
              disabled={!input.trim() || (status !== "idle" && status !== "done" && status !== "error")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
            >
              {status !== "idle" && status !== "done" && status !== "error" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Converting…
                </>
              ) : (
                <>Convert →</>
              )}
            </button>
            {status !== "idle" && (
              <span className="text-xs text-[var(--muted-foreground)] font-mono text-center lg:text-center">
                {STAGE_LABELS[status]}
              </span>
            )}
          </div>

          {/* Right — Output */}
          <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--muted)]">
              <span className="text-sm font-semibold text-[var(--foreground)]">Standard Bangla</span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-white transition-colors disabled:opacity-40"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!output}
                  className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-white transition-colors disabled:opacity-40"
                >
                  Download
                </button>
                <button
                  onClick={() => setOutput("")}
                  disabled={!output}
                  className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-white transition-colors disabled:opacity-40"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="h-64 px-4 py-4 bg-white overflow-y-auto">
              {status !== "idle" && status !== "done" && status !== "error" ? (
                <div className="h-full flex flex-col gap-3 items-start justify-center">
                  {["Analyzing text", "Detecting Banglish", "Normalizing", "Generating Bangla"].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-indigo-300 border-t-indigo-600 animate-spin" style={{ animationDuration: `${0.7 + i * 0.1}s` }} />
                      <span className="text-sm text-[var(--muted-foreground)]">{s}…</span>
                    </div>
                  ))}
                </div>
              ) : output ? (
                <p className="font-bengali text-2xl text-[var(--foreground)] leading-relaxed">{output}</p>
              ) : (
                <p className="text-sm text-[var(--muted-foreground)] italic">Converted Bangla will appear here…</p>
              )}
            </div>
            <div className="px-4 py-2 border-t border-[var(--border)] flex gap-4 text-xs text-[var(--muted-foreground)] bg-[var(--muted)]">
              <span>{output.length} chars</span>
              {processingTime && <span className="font-mono">{processingTime}ms</span>}
            </div>
          </div>
        </div>

        {/* Info card */}
        {status === "done" && (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Input Type", value: "Banglish (Romanized)" },
              { label: "Model", value: "Consensus Ensemble" },
              { label: "Processing Time", value: `${processingTime}ms` },
              { label: "Output Status", value: "✓ Normalized" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl border border-[var(--border)] px-4 py-3">
                <div className="text-xs text-[var(--muted-foreground)] mb-1">{item.label}</div>
                <div className="text-sm font-medium text-[var(--foreground)] font-mono">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Result analysis */}
        {status === "done" && output && (
          <div className="mt-6 bg-white rounded-xl border border-[var(--border)] p-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-4">Conversion Summary</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Original Banglish</div>
                <div className="rounded-lg bg-[var(--muted)] px-4 py-3 font-mono text-sm text-[var(--foreground)] border border-[var(--border)]">
                  {input}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-2">Standard Bangla</div>
                <div className="rounded-lg bg-indigo-50 border border-indigo-100 px-4 py-3">
                  <span className="font-bengali text-xl text-[var(--foreground)]">{output}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                ["Input Words", wordCount(input)],
                ["Input Chars", input.length],
                ["Output Chars", output.length],
                ["Time", `${processingTime}ms`],
              ].map(([l, v]) => (
                <div key={l as string} className="rounded-lg bg-[var(--muted)] px-3 py-3">
                  <div className="text-lg font-bold text-[var(--foreground)] font-display">{v}</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
