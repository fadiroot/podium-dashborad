function StatusBadge({ status }) {
  const styles = {
    passed: "bg-slate-100 text-slate-600",
    current: "bg-sky-100 text-sky-700",
    upcoming: "bg-emerald-100 text-emerald-700",
  };
  const labels = {
    passed: "Passed",
    current: "Current",
    upcoming: "Upcoming",
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z" />
    </svg>
  );
}

function ProblemsPage({ problems }) {
  const firstUpcomingIndex = problems.findIndex((p) => p.status === "upcoming");

  const pastel = {
    passed: {
      bg: "from-slate-50 to-gray-50",
      ring: "ring-slate-200",
      accent: "from-slate-200 to-gray-200",
      textMuted: "text-slate-400",
    },
    current: {
      bg: "from-sky-50 to-indigo-50",
      ring: "ring-sky-300",
      accent: "from-sky-200 to-indigo-200",
      textMuted: "text-gray-900",
    },
    upcoming: {
      bg: "from-emerald-50 to-teal-50",
      ring: "ring-emerald-200",
      accent: "from-emerald-200 to-teal-200",
      textMuted: "text-gray-900",
    },
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Problems</h2>
        <p className="text-sm text-gray-500">
          All tournament problems with duration, points, and bonus
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {problems.map((p, idx) => {
          const isPassed = p.status === "passed";
          const isCurrent = p.status === "current";
          const isUpcoming = p.status === "upcoming";
          const theme = pastel[p.status];
          const textMuted = isPassed ? theme.textMuted : "text-gray-900";
          const ring = isCurrent
            ? `ring-2 ${theme.ring} scale-[1.01]`
            : isUpcoming
            ? `ring-1 ${theme.ring}`
            : "";

          return (
            <div
              key={p.id}
              className={`relative rounded-lg shadow-sm border border-gray-200 bg-gradient-to-br ${theme.bg} ${ring} transition-transform`}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className={`p-5 ${isPassed ? "opacity-90" : ""}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-base font-semibold ${textMuted}`}>
                    {p.title}
                  </h3>
                  <StatusBadge status={p.status} />
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className={`font-medium ${textMuted}`}>
                      {p.duration} min
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Points</div>
                    <div className={`font-medium ${textMuted}`}>{p.points}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Bonus</div>
                    <div className={`font-medium ${textMuted}`}>{p.bonus}</div>
                  </div>
                </div>
              </div>

              <div
                className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${theme.accent} rounded-l-lg`}
              />

              {isPassed && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2 text-slate-600">
                    <LockIcon />
                    <span className="text-sm font-medium">Locked</span>
                  </div>
                </div>
              )}

              {isCurrent && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xs px-2 py-1 rounded shadow">
                  Now
                </div>
              )}

              {isUpcoming && idx === firstUpcomingIndex && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-2 py-1 rounded shadow">
                  Next
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProblemsPage;
