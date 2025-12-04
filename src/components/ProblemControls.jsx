import { useState, useEffect } from 'react'

function ProblemControls({ teams, onProblemSolved }) {
  const [currentProblem, setCurrentProblem] = useState({
    name: 'Problem D',
    difficulty: 'Hard',
    baseScore: 230,
    bonusScore: 50,
    timeRemaining: 1200 // 20 minutes in seconds
  })

  const [timeRemaining, setTimeRemaining] = useState(currentProblem.timeRemaining)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const difficultyColors = {
    Easy: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    Medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
    Hard: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  }

  const handleSolve = (teamId) => {
    const totalPoints = currentProblem.baseScore + currentProblem.bonusScore
    onProblemSolved(teamId, currentProblem.name, totalPoints)
  }

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const difficultyStyle = difficultyColors[currentProblem.difficulty]

  const teamButtonStyles = {
    red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', hover: 'hover:bg-red-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', hover: 'hover:bg-blue-100' },
    green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', hover: 'hover:bg-green-100' },
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Current Problem</h2>
        <p className="text-sm text-gray-500 mt-0.5">Problem details and simulation</p>
      </div>
      
      {/* Problem Info */}
      <div className="mb-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">{currentProblem.name}</h3>
            <span className={`
              px-3 py-1.5 rounded-md text-xs font-semibold border
              ${difficultyStyle.bg} ${difficultyStyle.text} ${difficultyStyle.border}
            `}>
              {currentProblem.difficulty}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1 font-medium">Base Score</div>
            <div className="text-lg font-bold text-gray-900">{currentProblem.baseScore} pts</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1 font-medium">Bonus</div>
            <div className="text-lg font-bold text-green-600">+{currentProblem.bonusScore} pts</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500 font-medium">Time Remaining</div>
            <div className={`text-base font-bold font-mono ${
              timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'
            }`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 rounded-full ${
                timeRemaining < 300 ? 'bg-red-500' : 'bg-blue-600'
              }`}
              style={{ width: `${(timeRemaining / currentProblem.timeRemaining) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Solve Buttons */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Simulate Submission</div>
        {teams.map(team => {
          const buttonStyle = teamButtonStyles[team.color] || teamButtonStyles.blue
          return (
            <button
              key={team.id}
              onClick={() => handleSolve(team.id)}
              className={`
                w-full px-4 py-2.5 rounded-lg text-sm font-semibold
                transition-all duration-200 border
                ${buttonStyle.bg} ${buttonStyle.text} ${buttonStyle.border} ${buttonStyle.hover}
                hover:shadow-sm active:scale-[0.98]
              `}
            >
              {team.name} solved {currentProblem.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProblemControls
