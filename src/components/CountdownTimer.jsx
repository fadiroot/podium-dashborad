import { useState, useEffect } from 'react'

function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState(45 * 60) // 45 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const totalTime = 45 * 60
  const progress = (timeRemaining / totalTime) * 100
  const isWarning = timeRemaining < 60

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Tournament Countdown</h2>
          <p className="text-sm text-gray-500 mt-0.5">Time remaining until tournament ends</p>
        </div>
        <div className="text-right">
          <div className={`text-xs font-medium uppercase tracking-wide ${
            isWarning ? 'text-red-600' : 'text-gray-500'
          }`}>
            {isWarning ? 'Final Minutes' : 'In Progress'}
          </div>
          <div className={`text-xs mt-1 ${
            isWarning ? 'text-red-500' : 'text-gray-400'
          }`}>
            {Math.round(progress)}% remaining
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className={`text-5xl font-bold text-center font-mono ${
          isWarning ? 'text-red-600' : 'text-blue-600'
        }`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 rounded-full ${
              isWarning 
                ? 'bg-red-500' 
                : 'bg-blue-600'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
