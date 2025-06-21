import React from 'react'

interface EmergencyButtonProps {
  onClick: () => void
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed top-4 right-4 z-40 crisis-button animate-pulse-slow"
      onClick={onClick}
      aria-label="Emergency help - Get immediate support"
    >
      <div className="flex items-center space-x-2">
        <span className="text-2xl">🚨</span>
        <span className="hidden sm:inline">GET HELP NOW</span>
        <span className="sm:hidden">HELP</span>
      </div>
    </button>
  )
}

export default EmergencyButton 