import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const categories = [
  { name: "Correct", value: 74.07, color: "#4338ca", desc: "Output exactly matches the reference Bangla string." },
  { name: "Lexical Substitution", value: 10.2, color: "#818cf8", desc: "Correct transliteration but wrong Bangla word choice." },
  { name: "Word-count Mismatch", value: 7.5, color: "#93c5fd", desc: "Number of output words differs from reference." },
  { name: "Minor Spelling Error", value: 5.3, color: "#bfdbfe", desc: "Small character-level edit differences from reference." },
  { name: "Vowel/Diacritic Error", value: 2.93, color: "#e0e7ff", desc: "Incorrect vowel signs or missing diacritics in output." },
];

const examples = [
  {
    banglish: "ami bari jabo",
    expected: "আমি বাড়ি যাব।",
    output: "আমি বাড়ি যাব।",
    type: "Correct",
    typeColor: "green",
  },
  {
    banglish: "ektu poreo ami jabo",
    expected: "একটু পরেও আমি যাব।",
    output: "একটু পড়েও আমি যাব।",
    type: "Lexical Substitution",
    typeColor: "amber",
  },
  {
    banglish: "ami khub sundor achi",
    expected: "আমি খুব সুন্দর আছি।",
    output: "আমি খুব সুন্দরভাবে আছি।",
    type: "Word-count Mismatch",
    typeColor: "orange",
  },
  {
    banglish: "shobai kemon acho",
    expected: "সবাই কেমন আছো?",
    output: "সবাই কেমন আছ?",
    type: "Minor Spelling Error",
    typeColor: "blue",
  },
  {
    banglish: "ami tomake bhalobashi",
    expected: "আমি তোমাকে ভালোবাসি।",
    output: "আমি তোমাকে ভালবাসি।",
    type: "Vowel/Diacritic Error",
    typeColor: "red",
  },
];

const COLORS_MAP: Record<string, string> = {
  green: "bg-green-50 text-green-700 border-green-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  orange: "bg-orange-50 text-orange-700 border-orange-100",
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  red: "bg-red-50 text-red-700 border-red-100",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg">
        <p className="font-semibold text-sm text-[var(--foreground)]">{payload[0].name}</p>
        <p className="text-sm text-[var(--muted-foreground)]">{payload[0].value.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

export default function ErrorAnalysis() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono text-indigo-600 uppercase tracking-wider mb-3">CharTransformer (S4a) · Test Set</div>
          <h1 className="font-display text-4xl text-[var(--foreground)] mb-4">Error Analysis</h1>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Breakdown of output categories on the test set for the CharTransformer system, with example failure cases and common error patterns.
          </p>
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Donut */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-4">Output Category Distribution</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categories.map((c, i) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {categories.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-sm text-[var(--foreground)]">{c.name}</span>
                    <span className="ml-auto font-mono text-sm font-medium text-[var(--foreground)]">{c.value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-4">Error Category Breakdown</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categories} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 80]} tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={120} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8faff" }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {categories.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category descriptions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {categories.map((c) => (
            <div key={c.name} className="bg-white rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} />
                <span className="text-sm font-semibold text-[var(--foreground)]">{c.name}</span>
                <span className="ml-auto font-mono text-sm font-bold text-[var(--foreground)]">{c.value.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Example cards */}
        <div>
          <h2 className="font-display text-2xl text-[var(--foreground)] mb-6">Common Failure Patterns</h2>
          <div className="space-y-4">
            {examples.map((ex) => (
              <div key={ex.banglish} className="bg-white rounded-xl border border-[var(--border)] p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-semibold text-sm text-[var(--foreground)]">Example</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${COLORS_MAP[ex.typeColor]}`}>
                    {ex.type}
                  </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)] mb-1 font-semibold uppercase tracking-wider">Banglish Input</div>
                    <div className="font-mono text-sm bg-[var(--muted)] rounded-lg px-3 py-2 text-[var(--foreground)]">{ex.banglish}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)] mb-1 font-semibold uppercase tracking-wider">Expected Bangla</div>
                    <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                      <span className="font-bengali text-lg text-green-800">{ex.expected}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--muted-foreground)] mb-1 font-semibold uppercase tracking-wider">Model Output</div>
                    <div className={`rounded-lg px-3 py-2 ${ex.type === "Correct" ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"}`}>
                      <span className={`font-bengali text-lg ${ex.type === "Correct" ? "text-green-800" : "text-red-800"}`}>{ex.output}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
