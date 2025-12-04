function WinProbability({ teams }) {
  // Calculate probabilities based on scores
  const totalScore = teams.reduce((sum, team) => sum + team.score, 0)
  const probabilities = teams.map(team => ({
    ...team,
    probability: totalScore > 0 ? (team.score / totalScore) * 100 : 0
  })).sort((a, b) => b.probability - a.probability)

  const teamColors = {
    red: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Win Probability</h2>
        <p className="text-sm text-gray-500 mt-0.5">Estimated victory chances</p>
      </div>
      
      <div className="space-y-4">
        {probabilities.map((team, index) => (
          <div key={team.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${teamColors[team.color].text}`}>
                  {team.name}
                </span>
                {index === 0 && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">
                    Leading
                  </span>
                )}
              </div>
              <span className="text-base font-bold text-gray-900">
                {Math.round(team.probability)}%
              </span>
            </div>
            
            <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${teamColors[team.color].bg} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${team.probability}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-xs text-gray-500 mb-3 text-center uppercase tracking-wide font-medium">Quick Stats</div>
        <div className="grid grid-cols-3 gap-3">
          {probabilities.map((team) => (
            <div key={team.id} className={`text-center p-2 rounded-lg ${teamColors[team.color].light}`}>
              <div className={`text-lg font-bold ${teamColors[team.color].text}`}>
                {Math.round(team.probability)}%
              </div>
              <div className="text-xs text-gray-600 mt-1 font-medium">{team.name.split(' ')[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WinProbability
