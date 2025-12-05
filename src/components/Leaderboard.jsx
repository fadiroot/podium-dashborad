function Leaderboard({ teams }) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const rankStyles = {
    1: {
      bg: "from-amber-50 to-yellow-50",
      ring: "ring-amber-200",
      badge: "from-amber-200 to-yellow-200 text-amber-800",
    },
    2: {
      bg: "from-slate-50 to-gray-50",
      ring: "ring-slate-200",
      badge: "from-slate-200 to-gray-200 text-slate-800",
    },
    3: {
      bg: "from-orange-50 to-amber-50",
      ring: "ring-orange-200",
      badge: "from-orange-200 to-amber-200 text-orange-800",
    },
    default: {
      bg: "from-sky-50 to-indigo-50",
      ring: "ring-indigo-200",
      badge: "from-indigo-200 to-sky-200 text-indigo-800",
    },
  };

  const teamAccents = {
    red: "from-red-200 to-red-300",
    blue: "from-sky-200 to-indigo-200",
    green: "from-emerald-200 to-teal-200",
    yellow: "from-amber-200 to-yellow-200",
    orange: "from-orange-200 to-amber-200",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Leaderboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Current tournament rankings
        </p>
      </div>

      <div className="space-y-3">
        {sortedTeams.map((team, index) => {
          const rank = index + 1;
          const style = rankStyles[rank] || rankStyles.default;
          const accent = teamAccents[team.color] || teamAccents.blue;
          const initial = team.name?.charAt(0) || "?";
          const progress = Math.min(100, Math.max(0, team.progress || 0));

          return (
            <div
              key={team.id}
              className={`relative flex items-center gap-4 p-4 rounded-lg border bg-gradient-to-br ring-1 ${style.ring} ${style.bg} transition-all duration-200 hover:shadow-md hover:translate-y-[1px]`}
            >
              <div className="flex items-center gap-3 w-12 justify-center">
                <div className="text-lg font-bold text-gray-900">#{rank}</div>
              </div>

              <div className="flex-shrink-0">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center text-sm font-bold text-white ring-2 ring-white shadow-sm`}
                >
                  {initial}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {team.name}
                  </h3>
                  {rank === 1 && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                      Leader
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-gray-700">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">
                      {team.score}
                    </span>
                    <span>points</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">
                      {team.problemsSolved}
                    </span>
                    <span>solved</span>
                  </span>
                </div>
                <div className="mt-2 h-2 bg-white/60 rounded">
                  <div
                    className="h-2 rounded bg-gradient-to-r from-indigo-400 to-sky-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex-shrink-0">
                <div
                  className={`px-4 py-2 rounded-full font-bold text-sm text-gray-900 bg-gradient-to-r ${style.badge} shadow-sm`}
                >
                  {team.score}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Leaderboard;
