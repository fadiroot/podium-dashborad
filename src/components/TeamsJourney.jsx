function TeamsJourney({ teams }) {
  const teamColors = {
    red: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-600', light: 'bg-red-50' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
    green: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-600', light: 'bg-green-50' },
    yellow: { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' },
    orange: { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
  }

  const teamInitials = {
    alpha: 'A',
    binary: 'B',
    stack: 'S',
  }

  const milestones = [
    { position: 20, label: 'Bronze', color: 'bg-amber-600' },
    { position: 50, label: 'Silver', color: 'bg-gray-400' },
    { position: 80, label: 'Final Sprint', color: 'bg-indigo-600' },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Teams Journey</h2>
        <p className="text-sm text-gray-500 mt-0.5">Progress toward tournament completion</p>
      </div>
      
      <div className="relative">
        {/* Track Background */}
        <div className="relative h-24 bg-gray-50 rounded-lg border border-gray-200">
          {/* Milestones */}
          {milestones.map((milestone) => (
            <div
              key={milestone.position}
              className="absolute top-0 bottom-0 flex flex-col items-center justify-center"
              style={{ left: `${milestone.position}%`, transform: 'translateX(-50%)' }}
            >
              <div className={`w-0.5 h-full ${milestone.color} opacity-40`} />
              <div className="absolute -top-6 text-center">
                <div className={`text-xs font-medium text-gray-600 whitespace-nowrap px-2 py-0.5 rounded ${milestone.color === 'bg-amber-600' ? 'bg-amber-50 text-amber-700' : milestone.color === 'bg-gray-400' ? 'bg-gray-100 text-gray-700' : 'bg-indigo-50 text-indigo-700'}`}>
                  {milestone.label}
                </div>
              </div>
            </div>
          ))}

          {/* Goal at the end */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-xl">🏆</span>
            </div>
            <div className="text-xs font-medium text-gray-600 text-center mt-1">Goal</div>
          </div>

          {/* Teams */}
          {teams.map((team, index) => (
            <div
              key={team.id}
              className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-out"
              style={{ 
                left: `${Math.min(team.progress, 88)}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: teams.length - index
              }}
            >
              <div className="relative">
                {/* Team Avatar */}
                <div className={`
                  w-12 h-12 rounded-full ${teamColors[team.color].bg}
                  flex items-center justify-center text-white font-bold text-lg shadow-md
                  border-2 border-white
                `}>
                  {teamInitials[team.id] || 'T'}
                </div>
                
                {/* Team Name Label */}
                <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className={`
                    px-2.5 py-1 rounded-md text-xs font-semibold
                    ${teamColors[team.color].light} ${teamColors[team.color].text}
                    border ${teamColors[team.color].border} border-opacity-30
                  `}>
                    {team.name}
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-1 font-medium">
                    {Math.round(team.progress)}%
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Progress Track Lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <div
              key={percent}
              className="absolute top-0 bottom-0 w-px bg-gray-200"
              style={{ left: `${percent}%` }}
            />
          ))}
        </div>

        {/* Start and End Labels */}
        <div className="flex justify-between mt-8 text-xs text-gray-500 font-medium">
          <span>Start (0%)</span>
          <span>Finish (100%)</span>
        </div>
      </div>
    </div>
  )
}

export default TeamsJourney
