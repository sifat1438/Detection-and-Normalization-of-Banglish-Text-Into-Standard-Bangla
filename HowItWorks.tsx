const stages = [
  {
    n: "01",
    title: "Banglish Input",
    icon: "⌨️",
    desc: "The user provides informal Romanized Bangla text — a mixture of Bengali words written in Latin characters, often with inconsistent spelling and varying conventions.",
    detail: "Example: \"ami ajke class e jabo\" — words like 'ami' (আমি), 'class' (ক্লাস) need detection and normalization.",
  },
  {
    n: "02",
    title: "Banglish Detection",
    icon: "🔍",
    desc: "The system identifies which tokens in the input are Banglish (Romanized Bangla) as opposed to pure English or already-normalized Bangla. This is a token-level binary classification task.",
    detail: "A character-level model examines character n-grams to determine whether each token is a Banglish candidate requiring normalization.",
  },
  {
    n: "03",
    title: "Token-Level Language Identification",
    icon: "🏷️",
    desc: "Each token is assigned a language label — Bangla-romanized, English, digit, or other. This fine-grained labeling enables the pipeline to route each token appropriately.",
    detail: "Language identification uses statistical features: character distribution, known lexicon membership, and contextual cues from surrounding tokens.",
  },
  {
    n: "04",
    title: "Text Normalization",
    icon: "⚙️",
    desc: "Detected Banglish tokens are fed into the normalization model, which converts them to their standard Unicode Bangla equivalents using learned sequence-to-sequence mappings.",
    detail: "The CharTransformer operates at character level, handling spelling variation, missing vowel diacritics, and ambiguous romanizations robustly.",
  },
  {
    n: "05",
    title: "Standard Unicode Bangla Output",
    icon: "✅",
    desc: "The pipeline produces clean, properly encoded Unicode Bangla text — ready for downstream NLP tasks such as sentiment analysis, machine translation, or information retrieval.",
    detail: "Output example: \"আমি আজকে ক্লাসে যাব।\" — complete with proper Bangla script, diacritics, and punctuation.",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-indigo-600 uppercase tracking-wider mb-3">Pipeline Architecture</div>
          <h1 className="font-display text-4xl text-[var(--foreground)] mb-4">How It Works</h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            A multi-stage NLP pipeline that takes noisy Romanized Bangla as input and produces standard Unicode Bangla through detection, identification, and neural normalization.
          </p>
        </div>

        {/* Pipeline visual */}
        <div className="space-y-4 mb-16">
          {stages.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="bg-white rounded-xl border border-[var(--border)] p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white font-mono font-bold text-sm flex items-center justify-center">
                      {s.n}
                    </div>
                    {i < stages.length - 1 && (
                      <div className="mt-2 w-px h-4 bg-indigo-200" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{s.icon}</span>
                      <h3 className="font-semibold text-lg text-[var(--foreground)]">{s.title}</h3>
                    </div>
                    <p className="text-[var(--muted-foreground)] leading-relaxed mb-3">{s.desc}</p>
                    <div className="rounded-lg bg-indigo-50 border border-indigo-100 px-4 py-3">
                      <p className="text-sm text-indigo-700 leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="flex justify-center my-1">
                  <svg className="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Why character-level */}
        <div className="bg-white rounded-2xl border border-[var(--border)] p-8 mb-12">
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-6">Why Character-Level Modeling?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Banglish text is inherently noisy — the same Bangla word can be romanized in dozens of ways. Word-level models fail because the vocabulary is essentially infinite and unpredictable.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Character-level sequence-to-sequence models handle this naturally: they operate over a small character alphabet and learn spelling patterns, making them robust to unseen romanizations.
              </p>
              <div className="space-y-2 mt-4">
                {[
                  ["Handles spelling variation", "\"ami\" / \"aami\" / \"amii\" → আমি"],
                  ["No OOV problem", "Any romanization can be processed"],
                  ["Learns vowel diacritics", "Inserts correct ো, ে, া, ি automatically"],
                  ["Compact model", "Small character vocab, efficient inference"],
                ].map(([adv, ex]) => (
                  <div key={adv as string} className="flex gap-3">
                    <span className="text-indigo-500 mt-0.5 flex-shrink-0">✓</span>
                    <div>
                      <span className="text-sm font-medium text-[var(--foreground)]">{adv}</span>
                      <span className="text-sm text-[var(--muted-foreground)]"> — {ex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual comparison */}
            <div className="space-y-4">
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <div className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-3">Word-Level Model</div>
                <div className="space-y-2">
                  {[
                    ["ami", "❓ OOV"],
                    ["aami", "❓ OOV"],
                    ["amii", "❓ OOV"],
                  ].map(([inp, out]) => (
                    <div key={inp} className="flex items-center gap-2 text-sm font-mono">
                      <span className="text-red-600">"{inp}"</span>
                      <span className="text-[var(--muted-foreground)]">→</span>
                      <span className="text-red-500">{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">Character-Level Model</div>
                <div className="space-y-2">
                  {[
                    ["ami", "আমি"],
                    ["aami", "আমি"],
                    ["amii", "আমি"],
                  ].map(([inp, out]) => (
                    <div key={inp} className="flex items-center gap-2 text-sm font-mono">
                      <span className="text-green-700">"{inp}"</span>
                      <span className="text-[var(--muted-foreground)]">→</span>
                      <span className="font-bengali text-lg text-green-700">{out}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model ensemble */}
        <div>
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-6">Model Systems Overview</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Copy Baseline", desc: "Returns the Banglish input unchanged. Used as a lower-bound baseline.", badge: "Baseline" },
              { name: "Rule-Based Transliteration", desc: "Hand-crafted phonetic rules mapping Roman characters to Bangla script.", badge: "Rule-based" },
              { name: "Statistical Lexicon + Rules", desc: "Statistical lexicon lookup combined with rule-based fallback for OOV tokens.", badge: "Statistical" },
              { name: "Character-Level Transformer", desc: "Neural seq2seq Transformer trained at character level. Best single model.", badge: "Neural · Best Single" },
              { name: "Consensus Ensemble", desc: "Combines multiple system outputs via consensus voting. Best overall system.", badge: "Best Overall" },
            ].map((m) => (
              <div key={m.name} className={`rounded-xl border p-5 ${m.badge === "Best Overall" ? "border-indigo-200 bg-indigo-50" : "border-[var(--border)] bg-white"}`}>
                <div className="text-xs font-semibold text-indigo-600 mb-2">{m.badge}</div>
                <h3 className="font-semibold text-sm text-[var(--foreground)] mb-2">{m.name}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
