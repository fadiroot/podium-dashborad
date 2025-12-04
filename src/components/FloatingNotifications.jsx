import { useEffect, useState } from 'react'

function FloatingNotifications({ notifications, onDismiss }) {
  const [visibleNotifications, setVisibleNotifications] = useState([])

  useEffect(() => {
    setVisibleNotifications(notifications)
    
    // Auto-remove notifications after 6 seconds
    const timers = notifications.map(notif => {
      return setTimeout(() => {
        setVisibleNotifications(prev => prev.filter(n => n.id !== notif.id))
        if (onDismiss) {
          setTimeout(() => onDismiss(notif.id), 300)
        }
      }, 6000)
    })

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [notifications, onDismiss])

  const colorClasses = {
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'bg-red-100' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'bg-blue-100' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: 'bg-green-100' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: 'bg-yellow-100' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: 'bg-orange-100' },
  }

  const handleDismiss = (id) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id))
    if (onDismiss) {
      setTimeout(() => onDismiss(id), 300)
    }
  }

  if (visibleNotifications.length === 0) return null

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3 max-w-sm w-full">
      {visibleNotifications.slice(0, 5).map((notification, index) => {
        const colors = colorClasses[notification.color] || colorClasses.blue
        return (
          <div
            key={notification.id}
            className={`
              ${colors.bg} ${colors.border} border rounded-lg shadow-lg p-4
              animate-slide-in-right
              transition-all duration-300
            `}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              transform: `translateX(${index * 2}px)`
            }}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.icon} flex items-center justify-center`}>
                <span className="text-sm">✓</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${colors.text}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              {/* Dismiss Button */}
              <button
                onClick={() => handleDismiss(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss notification"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress bar for auto-dismiss */}
            <div className="mt-3 h-0.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${colors.text.replace('text-', 'bg-').replace('-800', '-500')} transition-all duration-6000`}
                style={{ width: '100%', animation: 'shrink 6s linear forwards' }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FloatingNotifications

