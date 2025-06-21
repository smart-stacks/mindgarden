import React from 'react'

interface CrisisOverlayProps {
  onResolve: () => void
  onClose: () => void
}

const CrisisOverlay: React.FC<CrisisOverlayProps> = ({ onResolve, onClose }) => {
  const emergencyContacts = [
    { name: 'Crisis Hotline', number: '988', description: '24/7 Suicide & Crisis Lifeline' },
    { name: 'Emergency Services', number: '911', description: 'Immediate emergency response' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Text-based crisis support' }
  ]

  return (
    <div className="emergency-overlay">
      <div className="crisis-card">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🚨</div>
          <h2 className="text-2xl font-bold text-danger mb-2">Crisis Support Available</h2>
          <p className="text-gray-600">
            You're not alone. Help is here and ready to support you.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {emergencyContacts.map((contact) => (
            <div key={contact.number} className="bg-accent rounded-lg p-4">
              <h3 className="font-bold text-lg">{contact.name}</h3>
              <p className="text-2xl font-bold text-danger">{contact.number}</p>
              <p className="text-sm text-gray-600">{contact.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onResolve}
            className="support-button flex-1"
          >
            I'm Safe Now
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg text-base shadow-md hover:bg-gray-400 transition-all duration-200 flex-1"
          >
            Close
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💚 Remember: You are valued, you are loved, and you are not alone.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CrisisOverlay 