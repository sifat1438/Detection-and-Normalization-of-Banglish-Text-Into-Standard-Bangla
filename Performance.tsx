import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";

const results = [
  { system: "Rule-based", id: "S2", bleu: 3.85, chrf: 32.51, em: 0.20, cer: 41.68 },
  { system: "Stat + Rules", id: "S3", bleu: 14.80, chrf: 42.68, em: 1.77, cer: 40.77 },
  { system: "CharTransformer", id: "S4a", bleu: 83.42, chrf: 87.24, em: 74.07, cer: 9.32 },
  { system: "Consensus Ens.", id: "S7", bleu: 85.70, chrf: 90.85, em: 73.67, cer: 6.13 },
];

const COLORS = {
  S2: "#cbd5e1",
  S3: "#93c5fd",
  S4a: "#818cf8",
  S7: "#4338ca",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg">
        <p className="font-semibold text-sm text-[var(--foreground)] mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-sm">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: p.fill }} />
            <span className="text-[var(--muted-foreground)]">{p.name}:</span>
            <span className="font-mono font-medium text-[var(--foreground)]">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Performance() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-indigo-600 uppercase tracking-wider mb-3">Experimental Results</div>
          <h1 className="font-display text-4xl text-[var(--foreground)] mb-4">Performance Results</h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Quantitative evaluation of all model systems on the Banglish normalization test set. Metrics: BLEU, chrF++, Exact Match, and Character Error Rate.
          </p>
        </div>

        {/* Best system badges */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-[var(--primary)] rounded-xl p-5 text-white">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-75 mb-1">Best Overall System</div>
            <div className="font-display text-xl mb-1">Consensus Ensemble (S7)</div>
            <div className="flex gap-4 text-sm mt-3">
              <span>BLEU <strong>85.70</strong></span>
              <span>chrF++ <strong>90.85</strong></span>
              <span>CER <strong>6.13</strong></span>
            </div>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1">Best Single Model</div>
            <div className="font-display text-xl text-[var(--foreground)] mb-1">CharTransformer (S4a)</div>
            <div className="flex gap-4 text-sm text-[var(--muted-foreground)] mt-3">
              <span>BLEU <strong className="text-[var(--foreground)]">83.42</strong></span>
              <span>chrF++ <strong className="text-[var(--foreground)]">87.24</strong></span>
              <span>CER <strong className="text-[var(--foreground)]">9.32</strong></span>
            </div>
          </div>
        </div>

        {/* Results table */}
        <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="font-semibold text-[var(--foreground)]">Model Comparison Table</h2>
            <span className="text-xs text-[var(--muted-foreground)] font-mono">4 systems</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--muted)] text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  <th className="text-left px-6 py-3">System</th>
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-right px-4 py-3">BLEU ↑</th>
                  <th className="text-right px-4 py-3">chrF++ ↑</th>
                  <th className="text-right px-4 py-3">EM ↑</th>
                  <th className="text-right px-6 py-3">CER ↓</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {results.map((r, i) => (
                  <tr key={r.id} className={`${r.id === "S7" ? "bg-indigo-50/60" : "hover:bg-[var(--muted)]/40"} transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ background: COLORS[r.id as keyof typeof COLORS] }} />
                        <span className="font-medium text-sm text-[var(--foreground)]">{r.system}</span>
                        {r.id === "S7" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">Best</span>
                        )}
                        {r.id === "S4a" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">Neural</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-[var(--muted-foreground)]">{r.id}</td>
                    <td className="px-4 py-4 text-right font-mono text-sm font-medium text-[var(--foreground)]">{r.bleu.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right font-mono text-sm font-medium text-[var(--foreground)]">{r.chrf.toFixed(2)}</td>
                    <td className="px-4 py-4 text-right font-mono text-sm font-medium text-[var(--foreground)]">{r.em.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-mono text-sm font-medium text-[var(--foreground)]">{r.cer.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* BLEU bar */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-1">BLEU Score by System</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Higher is better</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={results} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="system" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8faff" }} />
                <Bar dataKey="bleu" name="BLEU" radius={[4, 4, 0, 0]}>
                  {results.map((r) => (
                    <Cell key={r.id} fill={COLORS[r.id as keyof typeof COLORS]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* chrF++ bar */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-1">chrF++ Score by System</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Higher is better</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={results} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="system" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8faff" }} />
                <Bar dataKey="chrf" name="chrF++" radius={[4, 4, 0, 0]}>
                  {results.map((r) => (
                    <Cell key={r.id} fill={COLORS[r.id as keyof typeof COLORS]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* CER bar */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-1">Character Error Rate (CER)</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Lower is better</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={results} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="system" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8faff" }} />
                <Bar dataKey="cer" name="CER" radius={[4, 4, 0, 0]}>
                  {results.map((r) => (
                    <Cell key={r.id} fill={COLORS[r.id as keyof typeof COLORS]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Exact match */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-1">Exact Match (EM)</h3>
            <p className="text-xs text-[var(--muted-foreground)] mb-4">Higher is better</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={results} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="system" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8faff" }} />
                <Bar dataKey="em" name="EM" radius={[4, 4, 0, 0]}>
                  {results.map((r) => (
                    <Cell key={r.id} fill={COLORS[r.id as keyof typeof COLORS]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {results.map((r) => (
            <div key={r.id} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-sm" style={{ background: COLORS[r.id as keyof typeof COLORS] }} />
              <span className="font-mono text-xs text-[var(--muted-foreground)]">{r.id}</span>
              <span className="text-[var(--foreground)]">{r.system}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
