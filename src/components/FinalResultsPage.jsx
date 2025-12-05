function Medal({ rank }) {
  const map = {
    1: {
      label: "🥇",
      bg: "from-amber-100 to-yellow-50",
      text: "text-amber-700",
      ring: "ring-amber-300",
    },
    2: {
      label: "🥈",
      bg: "from-slate-100 to-gray-50",
      text: "text-slate-700",
      ring: "ring-slate-300",
    },
    3: {
      label: "🥉",
      bg: "from-orange-100 to-amber-50",
      text: "text-orange-700",
      ring: "ring-orange-300",
    },
    default: {
      label: `#${rank}`,
      bg: "from-sky-50 to-indigo-50",
      text: "text-indigo-700",
      ring: "ring-indigo-200",
    },
  };
  const style = map[rank] || map.default;
  return (
    <div
      className={`inline-flex items-center gap-2 px-2 py-1 rounded bg-gradient-to-br ${style.bg} ${style.text} ring-1 ${style.ring}`}
    >
      <span className="text-base leading-none">{style.label}</span>
      <span className="text-xs font-medium">Rank {rank}</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function FinalResultsPage({ results }) {
  const sorted = [...results].sort((a, b) => a.rank - b.rank);
  const colors = {
    1: "#f59e0b",
    2: "#64748b",
    3: "#f97316",
    default: "#60a5fa",
    solved: "#34d399",
    penalties: "#a78bfa",
  };

  const tooltipStyle =
    "bg-white border border-gray-200 rounded-md shadow-sm px-3 py-2";

  const ScoreTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className={tooltipStyle}>
          <div className="text-xs text-gray-500">Team</div>
          <div className="text-sm font-semibold text-gray-900">{label}</div>
          <div className="mt-1 text-xs text-gray-500">Final Score</div>
          <div className="text-sm font-semibold text-gray-900">
            {item.value}
          </div>
        </div>
      );
    }
    return null;
  };

  const DuoTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const values = Object.fromEntries(
        payload.map((p) => [p.dataKey, p.value])
      );
      return (
        <div className={tooltipStyle}>
          <div className="text-xs text-gray-500">Team</div>
          <div className="text-sm font-semibold text-gray-900">{label}</div>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-gray-500">Solved</div>
              <div className="text-sm font-semibold text-gray-900">
                {values.problemsSolved}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Penalties</div>
              <div className="text-sm font-semibold text-gray-900">
                {values.penalties}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Final Results</h2>
        <p className="text-sm text-gray-500">
          Static global standings and summary
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sorted.map((t) => {
          const isTop3 = t.rank <= 3;
          const ring = isTop3 ? "ring-2" : "ring-1";
          const bg = isTop3
            ? t.rank === 1
              ? "from-amber-50 to-yellow-50"
              : t.rank === 2
              ? "from-slate-50 to-gray-50"
              : "from-orange-50 to-amber-50"
            : "from-sky-50 to-indigo-50";

          return (
            <div
              key={t.id}
              className={`relative rounded-lg border border-gray-200 bg-gradient-to-br ${bg} ring ${ring} ring-gray-200 shadow-sm`}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {t.name}
                  </h3>
                  <Medal rank={t.rank} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Stat label="Final Score" value={t.finalScore} />
                  <Stat label="Problems Solved" value={t.problemsSolved} />
                  <Stat label="Fastest Solve" value={`${t.fastestSolve} min`} />
                  <Stat label="Penalties" value={t.penalties} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-5 py-3">
            <div className="text-sm font-semibold text-gray-900">
              Scores Overview
            </div>
            <div className="text-xs text-gray-500">
              Hover bars to see values
            </div>
          </div>
          <div className="h-64 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sorted}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  content={<ScoreTooltip />}
                  cursor={{ fill: "rgba(148,163,184,0.15)" }}
                />
                <Legend />
                {sorted.map((t) => (
                  <Bar
                    key={t.id}
                    dataKey="finalScore"
                    name={t.name}
                    fill={colors[t.rank] || colors.default}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-5 py-3">
            <div className="text-sm font-semibold text-gray-900">
              Solved vs Penalties
            </div>
            <div className="text-xs text-gray-500">Hover bars to compare</div>
          </div>
          <div className="h-64 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sorted}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  content={<DuoTooltip />}
                  cursor={{ fill: "rgba(148,163,184,0.15)" }}
                />
                <Legend />
                <Bar
                  dataKey="problemsSolved"
                  name="Solved"
                  fill={colors.solved}
                />
                <Bar
                  dataKey="penalties"
                  name="Penalties"
                  fill={colors.penalties}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalResultsPage;
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
