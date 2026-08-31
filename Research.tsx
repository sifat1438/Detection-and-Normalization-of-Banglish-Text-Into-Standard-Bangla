import vocabWordCloud from "@/imports/image.png";

const models = [
  { id: "S1", name: "Copy Baseline", type: "Baseline", desc: "Returns Banglish input unchanged. Lower bound reference." },
  { id: "S2", name: "Rule-Based Transliteration", type: "Rule-based", desc: "Phonetic rules mapping Roman characters to Unicode Bangla." },
  { id: "S3", name: "Statistical Lexicon + Rules", type: "Statistical", desc: "Lexicon lookup with rule-based OOV fallback." },
  { id: "S4a", name: "CharTransformer", type: "Neural", desc: "Character-level Transformer seq2seq. Best single model." },
  { id: "S7", name: "Consensus Ensemble", type: "Ensemble", desc: "Consensus voting over multiple system outputs. Best overall." },
];

const metrics = [
  { name: "BLEU", desc: "Bilingual Evaluation Understudy. Measures n-gram overlap between hypothesis and reference.", range: "0–100, higher is better" },
  { name: "chrF++", desc: "Character-level F-score + word unigram recall. More robust to morphological variation.", range: "0–100, higher is better" },
  { name: "Exact Match (EM)", desc: "Percentage of outputs that exactly match the reference string.", range: "0–100, higher is better" },
  { name: "TER", desc: "Translation Edit Rate. Ratio of edits needed to match reference.", range: "Lower is better" },
  { name: "WER", desc: "Word Error Rate. Proportion of word-level edits relative to reference length.", range: "Lower is better" },
  { name: "CER", desc: "Character Error Rate. Proportion of character-level edits. Key metric for character models.", range: "Lower is better" },
];

export default function Research() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-indigo-600 uppercase tracking-wider mb-3">Methodology · Dataset · Models · Metrics</div>
          <h1 className="font-display text-4xl text-[var(--foreground)] mb-4">Research & Methodology</h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Academic documentation of the corpus, models, and evaluation framework used in this Banglish-to-Bangla normalization research.
          </p>
        </div>

        {/* Dataset */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-6">Dataset</h2>

          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {[
              { label: "Corpus", value: "Banglish–Bangla Parallel", sub: "Curated parallel sentence pairs" },
              { label: "Train Split", value: "80%", sub: "Training examples" },
              { label: "Validation Split", value: "10%", sub: "Hyperparameter tuning" },
            ].map((d) => (
              <div key={d.label} className="bg-white rounded-xl border border-[var(--border)] p-5">
                <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">{d.label}</div>
                <div className="text-2xl font-bold font-display text-[var(--foreground)]">{d.value}</div>
                <div className="text-xs text-[var(--muted-foreground)] mt-1">{d.sub}</div>
              </div>
            ))}
          </div>

          {/* Word cloud visualization */}
          <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden mb-6">
            <div className="px-6 pt-6 pb-4 border-b border-[var(--border)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">Corpus Vocabulary Distribution</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Word cloud comparison of the most frequent tokens in the Banglish source corpus (left) and the standard Bangla target corpus (right). Word size reflects relative frequency.
                  </p>
                </div>
                <div className="flex-shrink-0 flex gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-teal-400 inline-block" />
                    Source (Banglish)
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-orange-400 inline-block" />
                    Target (Bangla)
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#0a0a0a] p-4 sm:p-6">
              <img
                src={vocabWordCloud}
                alt="Word cloud comparison: Banglish source vocabulary on the left showing frequent romanized words like 'chilo', 'valo', 'kore', and Bangla target vocabulary on the right showing standard Bangla script words like 'একদম', 'এখন', 'সব'"
                className="w-full rounded-lg object-contain"
                style={{ maxHeight: 320 }}
              />
            </div>
            <div className="px-6 py-3 bg-[var(--muted)] flex flex-wrap gap-x-6 gap-y-1">
              {[
                ["Frequent Banglish tokens", "chilo, valo, kore, mon, khub, lagse, bhai"],
                ["Frequent Bangla tokens", "একদম, এখন, মন, এই, সব, পথ"],
              ].map(([label, examples]) => (
                <div key={label as string} className="flex gap-2 text-xs">
                  <span className="text-[var(--muted-foreground)]">{label}:</span>
                  <span className="font-mono text-[var(--foreground)]">{examples}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Data Preprocessing</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["Tokenization", "Word-level tokenization of Banglish and Bangla sides"],
                ["Character Segmentation", "Character-level splitting for seq2seq training"],
                ["Normalization", "Unicode normalization (NFC) applied to Bangla references"],
                ["Filtering", "Removal of non-Banglish pairs and noisy alignments"],
                ["Train/Val/Test Split", "Stratified split preserving domain distribution"],
                ["Vocabulary", "Character vocabulary derived from training set"],
              ].map(([step, desc]) => (
                <div key={step as string} className="flex gap-3">
                  <span className="text-indigo-500 mt-0.5 flex-shrink-0 text-sm">→</span>
                  <div>
                    <span className="text-sm font-medium text-[var(--foreground)]">{step}</span>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Models */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-6">Model Systems</h2>
          <div className="space-y-3">
            {models.map((m) => (
              <div
                key={m.id}
                className={`bg-white rounded-xl border p-5 flex gap-5 items-start ${
                  m.id === "S7" ? "border-indigo-200 ring-1 ring-indigo-100" : "border-[var(--border)]"
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-indigo-700">{m.id}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)]">{m.name}</h3>
                      <p className="text-sm text-[var(--muted-foreground)] mt-1">{m.desc}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          m.type === "Ensemble"
                            ? "bg-indigo-100 text-indigo-700"
                            : m.type === "Neural"
                            ? "bg-purple-100 text-purple-700"
                            : m.type === "Statistical"
                            ? "bg-blue-100 text-blue-700"
                            : m.type === "Rule-based"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        {m.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluation Metrics */}
        <section>
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-6">Evaluation Metrics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <div key={m.name} className="bg-white rounded-xl border border-[var(--border)] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono font-bold text-[var(--primary)] text-sm">{m.name}</span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-3">{m.desc}</p>
                <div className="text-xs px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] font-mono inline-block">
                  {m.range}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
