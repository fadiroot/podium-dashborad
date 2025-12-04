import { useEffect, useState } from 'react'

function NotificationsPanel({ notifications }) {
  const [visibleNotifications, setVisibleNotifications] = useState([])

  useEffect(() => {
    setVisibleNotifications(notifications)
    
    // Auto-remove notifications after 8 seconds
    const timers = notifications.map(notif => {
      return setTimeout(() => {
        setVisibleNotifications(prev => prev.filter(n => n.id !== notif.id))
      }, 8000)
    })

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [notifications])

  const colorClasses = {
    red: 'border-l-red-500 bg-red-50',
    blue: 'border-l-blue-500 bg-blue-50',
    green: 'border-l-green-500 bg-green-50',
    yellow: 'border-l-yellow-500 bg-yellow-50',
    orange: 'border-l-orange-500 bg-orange-50',
  }

  const textColors = {
    red: 'text-red-700',
    blue: 'text-blue-700',
    green: 'text-green-700',
    yellow: 'text-yellow-700',
    orange: 'text-orange-700',
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Live Notifications</h2>
        <p className="text-sm text-gray-500 mt-0.5">Real-time tournament activity</p>
      </div>
      
      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
        {visibleNotifications.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <div className="text-3xl mb-2 opacity-50">📭</div>
            <div className="text-sm">No recent activity</div>
          </div>
        ) : (
          visibleNotifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`
                border-l-4 rounded-r-lg p-3
                ${colorClasses[notification.color] || colorClasses.blue}
                animate-slide-in
              `}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between">
                <p className={`text-sm font-medium flex-1 ${textColors[notification.color] || textColors.blue}`}>
                  {notification.message}
                </p>
                <span className="text-xs text-gray-500 ml-3 whitespace-nowrap">
                  {new Date(notification.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationsPanel
