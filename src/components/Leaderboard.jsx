function Leaderboard({ teams }) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score)

  const rankStyles = {
    1: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700' },
    2: { bg: 'bg-gray-50', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-700' },
    3: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  }

  const teamColors = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    orange: 'text-orange-600',
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Leaderboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">Current tournament rankings</p>
      </div>
      
      <div className="space-y-2">
        {sortedTeams.map((team, index) => {
          const rank = index + 1
          const isTopThree = rank <= 3
          const style = isTopThree ? rankStyles[rank] : { bg: 'bg-white', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-700' }
          
          return (
            <div
              key={team.id}
              className={`
                flex items-center gap-4 p-4 rounded-lg border
                ${style.bg} ${style.border}
                transition-all duration-200 hover:shadow-md
              `}
            >
              {/* Rank */}
              <div className="flex-shrink-0 w-10 text-center">
                <div className={`
                  text-lg font-bold
                  ${isTopThree ? 'text-gray-900' : 'text-gray-500'}
                `}>
                  #{rank}
                </div>
              </div>

              {/* Team Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold ${teamColors[team.color]} truncate`}>
                    {team.name}
                  </h3>
                  {rank === 1 && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">
                      Leader
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">{team.score}</span>
                    <span>points</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">{team.problemsSolved}</span>
                    <span>solved</span>
                  </span>
                  {team.problemsSolved > 0 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                      Fast-solve
                    </span>
                  )}
                </div>
              </div>

              {/* Score Badge */}
              <div className="flex-shrink-0">
                <div className={`px-4 py-2 rounded-lg font-bold text-base ${style.badge}`}>
                  {team.score}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Leaderboard
