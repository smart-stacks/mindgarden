import React from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation.tsx'

const PeersPage: React.FC = () => {
  const peers = [
    {
      id: 1,
      name: 'Alex M.',
      avatar: 'AM',
      compatibility: 92,
      interests: ['Anxiety', 'Mindfulness', 'Art Therapy'],
      lastActive: '2 min ago'
    },
    {
      id: 2,
      name: 'Jordan K.',
      avatar: 'JK',
      compatibility: 87,
      interests: ['Depression', 'Exercise', 'Journaling'],
      lastActive: '5 min ago'
    },
    {
      id: 3,
      name: 'Sam R.',
      avatar: 'SR',
      compatibility: 78,
      interests: ['Stress', 'Meditation', 'Nature'],
      lastActive: '10 min ago'
    },
    {
      id: 4,
      name: 'Taylor L.',
      avatar: 'TL',
      compatibility: 85,
      interests: ['Grief', 'Music', 'Support Groups'],
      lastActive: '15 min ago'
    },
    {
      id: 5,
      name: 'Casey P.',
      avatar: 'CP',
      compatibility: 91,
      interests: ['PTSD', 'Yoga', 'Creative Writing'],
      lastActive: '1 hour ago'
    }
  ]

  const handleConnect = (peerId: number) => {
    alert(`Connecting with peer ${peerId}...`)
  }

  return (
    <div className="h-full">
      {/* Safety Guidelines Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-4 mb-6 shadow-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <h3 className="font-semibold">Safety Guidelines</h3>
            <p className="text-sm opacity-90">
              Remember: This is a supportive community. Be kind, respectful, and never share personal information.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 p-4">
        {/* Peer Cards */}
        <div className="space-y-4">
          {peers.map((peer, index) => (
            <motion.div
              key={peer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="peer-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary to-secondary-dark rounded-full flex items-center justify-center text-white font-semibold">
                    {peer.avatar}
                  </div>
                  
                  {/* Peer Info */}
                  <div>
                    <h3 className="font-semibold text-gray-800">{peer.name}</h3>
                    <p className="text-sm text-gray-600">{peer.lastActive}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {peer.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Compatibility & Connect */}
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold text-primary">{peer.compatibility}%</span> match
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleConnect(peer.id)}
                    className="support-button text-sm py-2 px-4"
                  >
                    Connect
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No More Peers Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="text-4xl mb-4">✨</div>
          <h3 className="font-semibold text-gray-800 mb-2">That's all for now!</h3>
          <p className="text-gray-600">
            Check back later for more peer connections. New supportive friends join our community regularly.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default PeersPage 