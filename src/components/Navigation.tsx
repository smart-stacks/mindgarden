import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navigation: React.FC = () => {
  const location = useLocation()
  const { isAuthenticated, isGuest } = useAuth()

  const navItems = [
    { path: '/chat', label: 'Chat', icon: '💬' },
    { path: '/peers', label: 'Peers', icon: '🤝' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/progress', label: 'Progress', icon: '📊' },
    { path: '/monitor', label: 'Monitor', icon: '📱' }
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200">
      <div className="flex justify-around p-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${
              location.pathname === item.path
                ? 'bottom-nav-item active'
                : 'bottom-nav-item inactive'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
        
        {isGuest && (
          <Link
            to="/login"
            className="bottom-nav-item inactive hover:text-[#CBAACB] transition-colors"
          >
            <span className="text-xl mb-1">🔒</span>
            <span className="text-xs font-medium">Login</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navigation