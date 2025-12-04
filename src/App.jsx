import { useState, useEffect } from 'react'
import CountdownTimer from './components/CountdownTimer'
import TeamsJourney from './components/TeamsJourney'
import FloatingNotifications from './components/FloatingNotifications'
import NotificationBell from './components/NotificationBell'
import WinProbability from './components/WinProbability'
import Leaderboard from './components/Leaderboard'
import ProblemControls from './components/ProblemControls'

function App() {
  const [teams, setTeams] = useState([
    { id: 'alpha', name: 'Team Alpha', score: 1250, problemsSolved: 4, color: 'red', progress: 42 },
    { id: 'binary', name: 'Binary Beasts', score: 980, problemsSolved: 3, color: 'blue', progress: 33 },
    { id: 'stack', name: 'Stack Overflowers', score: 750, problemsSolved: 2, color: 'green', progress: 25 },
  ])

  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(true)

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleProblemSolved = (teamId, problemName, points) => {
    setTeams(prevTeams => {
      const updated = prevTeams.map(team => {
        if (team.id === teamId) {
          const newScore = team.score + points
          const newProgress = Math.min(100, (newScore / 3000) * 100)
          return {
            ...team,
            score: newScore,
            problemsSolved: team.problemsSolved + 1,
            progress: newProgress
          }
        }
        return team
      })
      // Recalculate progress based on relative scores
      const maxScore = Math.max(...updated.map(t => t.score))
      return updated.map(team => ({
        ...team,
        progress: (team.score / maxScore) * 100
      }))
    })

    const team = teams.find(t => t.id === teamId)
    addNotification(`${team.name} solved ${problemName} (+${points} pts, bonus applied)`, team.color)
  }

  const addNotification = (message, color) => {
    const notification = {
      id: Date.now(),
      message,
      color,
      timestamp: new Date()
    }
    setNotifications(prev => [notification, ...prev].slice(0, 10))
  }

  // Simulate random notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomTeam = teams[Math.floor(Math.random() * teams.length)]
        const problems = ['Problem A', 'Problem B', 'Problem C', 'Problem D', 'Problem E']
        const problem = problems[Math.floor(Math.random() * problems.length)]
        const points = Math.floor(Math.random() * 200) + 100
        addNotification(`${randomTeam.name} solved ${problem} (+${points} pts)`, randomTeam.color)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [teams])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                TCPC Challenge Simulator
              </h1>
              <p className="text-sm text-gray-500 mt-1">Competitive Programming Tournament Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <NotificationBell 
                count={notifications.length} 
                onClick={() => setShowNotifications(!showNotifications)}
              />
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Status</div>
                <div className="text-sm font-medium text-green-600 mt-0.5">Live</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Top Section: Countdown Timer */}
        <div className="mb-8">
          <CountdownTimer />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Teams Journey */}
            <TeamsJourney teams={teams} />

            {/* Bottom Row: Leaderboard and Problem Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Leaderboard teams={teams} />
              <ProblemControls teams={teams} onProblemSolved={handleProblemSolved} />
            </div>
          </div>

          {/* Right Column: Side Panels */}
          <div className="space-y-6">
            <WinProbability teams={teams} />
          </div>
        </div>
      </div>

      {/* Floating Notifications */}
      {showNotifications && (
        <FloatingNotifications 
          notifications={notifications} 
          onDismiss={handleDismissNotification}
        />
      )}
    </div>
  )
}

export default App
