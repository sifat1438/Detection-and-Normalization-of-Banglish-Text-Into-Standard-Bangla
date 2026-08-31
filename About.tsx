const future = [
  { icon: "📚", title: "Larger Corpus", desc: "Expand the parallel Banglish–Bangla corpus to improve coverage and generalization." },
  { icon: "🤗", title: "Pre-trained Bangla Models", desc: "Fine-tune large pre-trained Bangla sequence-to-sequence models for normalization." },
  { icon: "🔄", title: "Back-Transliteration Augmentation", desc: "Generate synthetic Banglish training data via back-transliteration for data augmentation." },
  { icon: "🧠", title: "Contextual Disambiguation", desc: "Use sentence-level context to resolve ambiguous romanizations more accurately." },
  { icon: "🔗", title: "Downstream NLP Evaluation", desc: "Evaluate the impact of normalization on downstream tasks: sentiment analysis, MT, IR." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono text-indigo-600 uppercase tracking-wider mb-3">Thesis Research · Daffodil International University</div>
          <h1 className="font-display text-4xl lg:text-5xl text-[var(--foreground)] mb-3">About the Research</h1>
          <p className="text-base font-medium text-indigo-600 mb-4">Detection and Normalization of Banglish Text Into Standard Bangla</p>
          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            This project investigates the detection and normalization of Banglish — Romanized Bengali — into standard Unicode Bangla using an NLP-based multi-stage pipeline combining rule-based, statistical, and neural approaches.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Research objective */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="font-display text-xl text-[var(--foreground)] mb-3">Research Objective</h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                To design, implement, and evaluate an end-to-end NLP pipeline that can automatically detect Banglish text and normalize it into clean, standard Unicode Bangla — enabling downstream Bangla NLP applications to operate on properly encoded input.
              </p>
            </div>

            {/* Problem statement */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="font-display text-xl text-[var(--foreground)] mb-3">Problem Statement</h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
                Bengali speakers frequently write in Romanized form — "Banglish" — on social media, messaging platforms, and informal digital communication. This produces vast quantities of text that Bangla NLP tools cannot process, as they expect standard Unicode Bangla input.
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Banglish romanization is highly inconsistent: the same word may be spelled dozens of different ways, making dictionary-based approaches insufficient and motivating character-level neural modeling.
              </p>
            </div>

            {/* Proposed approach */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="font-display text-xl text-[var(--foreground)] mb-3">Proposed Approach</h2>
              <div className="space-y-3">
                {[
                  ["Detection", "Token-level Banglish detection classifies each token as Banglish or non-Banglish."],
                  ["Identification", "Language identification assigns fine-grained labels to all tokens."],
                  ["Normalization", "A character-level Transformer converts Banglish tokens to standard Bangla."],
                  ["Ensemble", "A consensus ensemble combines multiple system outputs for best overall accuracy."],
                ].map(([step, desc]) => (
                  <div key={step as string} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold mt-0.5">
                      {["1","2","3","4"][["Detection","Identification","Normalization","Ensemble"].indexOf(step as string)]}
                    </span>
                    <div>
                      <span className="font-medium text-sm text-[var(--foreground)]">{step}: </span>
                      <span className="text-sm text-[var(--muted-foreground)]">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key contributions */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="font-display text-xl text-[var(--foreground)] mb-3">Key Contributions</h2>
              <ul className="space-y-2">
                {[
                  "Multi-stage Banglish normalization pipeline combining rule-based, statistical, and neural components",
                  "Character-level Transformer trained on curated Banglish–Bangla parallel corpus",
                  "Consensus ensemble that achieves 85.70 BLEU and 90.85 chrF++ on the test set",
                  "Systematic comparison of five model systems using six evaluation metrics",
                  "Publicly documented error analysis categorizing failure modes",
                ].map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-[var(--muted-foreground)]">
                    <span className="text-indigo-500 mt-0.5 flex-shrink-0">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="font-display text-xl text-[var(--foreground)] mb-3">Limitations</h2>
              <ul className="space-y-2">
                {[
                  "Limited corpus size may affect generalization to rare or domain-specific vocabulary.",
                  "The system may struggle with highly ambiguous romanizations where multiple Bangla words are valid.",
                  "Code-mixed sentences with complex English–Bangla interleaving pose challenges.",
                  "Evaluation is limited to automatic metrics; human evaluation is not included.",
                ].map((l) => (
                  <li key={l} className="flex gap-2 text-sm text-[var(--muted-foreground)]">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">⚠</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Researcher card */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 font-display">S</span>
              </div>
              <h3 className="font-semibold text-[var(--foreground)]">Sal Sabily Sifath</h3>
              <p className="text-xs font-mono text-[var(--muted-foreground)] mt-1">ID: 0242220005101438</p>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">Computer Science & Engineering</p>
              <p className="text-sm font-medium text-indigo-600 mt-0.5">Daffodil International University</p>
              <div className="mt-5 flex flex-col gap-2">
                {["GitHub", "LinkedIn", "Research Paper", "Thesis"].map((l) => (
                  <span
                    key={l}
                    className="w-full text-center py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--muted-foreground)] cursor-not-allowed opacity-60"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-5">
              <h3 className="font-semibold text-sm text-[var(--foreground)] mb-4">Research at a Glance</h3>
              <div className="space-y-3">
                {[
                  ["Task", "Banglish Normalization"],
                  ["Models Evaluated", "5 systems"],
                  ["Best BLEU", "85.70 (Ensemble)"],
                  ["Best CER", "6.13% (Ensemble)"],
                  ["Evaluation Metrics", "BLEU, chrF++, EM, TER, WER, CER"],
                ].map(([l, v]) => (
                  <div key={l as string} className="flex justify-between gap-2 text-sm border-b border-[var(--border)] pb-2 last:border-0 last:pb-0">
                    <span className="text-[var(--muted-foreground)]">{l}</span>
                    <span className="font-medium text-[var(--foreground)] text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Future work */}
        <div>
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-6">Future Research Directions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {future.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-[var(--border)] p-5 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-sm text-[var(--foreground)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
