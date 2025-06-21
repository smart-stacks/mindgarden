import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Peer {
  id: string
  name: string
  avatar: string
  description: string
  compatibility: number
  isOnline: boolean
  specialties: string[]
}

interface SupportGroup {
  id: string
  name: string
  description: string
  members: number
  nextMeeting: string
  isActive: boolean
}

const PeerSupportHub: React.FC = () => {
  const [selectedPeer, setSelectedPeer] = useState<Peer | null>(null)
  const [showSafetyGuidelines, setShowSafetyGuidelines] = useState(false)

  const peers: Peer[] = [
    {
      id: '1',
      name: 'Alex',
      avatar: '👤',
      description: 'Recovering from anxiety and depression. Here to listen and share experiences.',
      compatibility: 85,
      isOnline: true,
      specialties: ['Anxiety', 'Depression', 'Recovery']
    },
    {
      id: '2',
      name: 'Sam',
      avatar: '👤',
      description: 'Peer counselor with 3 years of experience supporting others through difficult times.',
      compatibility: 92,
      isOnline: true,
      specialties: ['Crisis Support', 'Peer Counseling', 'Active Listening']
    },
    {
      id: '3',
      name: 'Jordan',
      avatar: '👤',
      description: 'Working through trauma and finding strength in community support.',
      compatibility: 78,
      isOnline: false,
      specialties: ['Trauma', 'Community Support', 'Healing']
    }
  ]

  const supportGroups: SupportGroup[] = [
    {
      id: '1',
      name: 'Anxiety Support Circle',
      description: 'A safe space to share experiences and coping strategies for anxiety.',
      members: 24,
      nextMeeting: 'Today, 7:00 PM',
      isActive: true
    },
    {
      id: '2',
      name: 'Depression Recovery Group',
      description: 'Supporting each other through the journey of depression recovery.',
      members: 18,
      nextMeeting: 'Tomorrow, 6:30 PM',
      isActive: true
    },
    {
      id: '3',
      name: 'Crisis Survivors Network',
      description: 'For those who have experienced crisis and want to support others.',
      members: 31,
      nextMeeting: 'Wednesday, 8:00 PM',
      isActive: true
    }
  ]

  const handleConnect = (peer: Peer) => {
    setSelectedPeer(peer)
  }

  const startConversation = () => {
    if (selectedPeer) {
      // Navigate to chat or open conversation
      alert(`Starting conversation with ${selectedPeer.name}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-6">🤝</div>
        <h1 className="section-title">Peer Support Hub</h1>
        <p className="text-lg text-gray-600">
          Connect with others who understand what you're going through
        </p>
      </motion.div>

      {/* Safety Guidelines */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="content-card bg-gradient-to-r from-warning/10 to-orange-400/10 border-warning/30"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h3 className="text-xl font-semibold text-warning">Safety Guidelines</h3>
              <p className="text-sm text-gray-700">
                Remember: This is peer support, not professional therapy
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSafetyGuidelines(!showSafetyGuidelines)}
            className="text-warning hover:text-red-600 font-medium"
          >
            {showSafetyGuidelines ? 'Hide' : 'Show'} Details
          </motion.button>
        </div>
        
        <AnimatePresence>
          {showSafetyGuidelines && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 text-sm text-gray-700"
            >
              <div className="flex items-start gap-3">
                <span className="text-warning mt-1">⚠️</span>
                <p>This is peer support, not professional medical advice</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 mt-1">🚨</span>
                <p>If you're in crisis, call 988 or 911 immediately</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-1">🤝</span>
                <p>Be respectful and supportive of others</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">📞</span>
                <p>Report any concerning behavior to moderators</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-500 mt-1">🔒</span>
                <p>Your privacy and safety are our top priorities</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Peer Matching */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="content-card"
      >
        <h2 className="section-title">Available Peers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {peers.map((peer, index) => (
            <motion.div
              key={peer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="peer-card"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{peer.avatar}</span>
                <div>
                  <h3 className="font-bold text-lg">{peer.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${peer.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <span className="text-xs text-gray-500">
                      {peer.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{peer.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Compatibility</span>
                  <span className="font-semibold">{peer.compatibility}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${peer.compatibility}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {peer.specialties.map((specialty) => (
                    <span 
                      key={specialty}
                      className="bg-gradient-to-r from-primary/20 to-yellow-400/20 text-primary text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleConnect(peer)}
                disabled={!peer.isOnline}
                className="support-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {peer.isOnline ? 'Connect' : 'Offline'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Support Groups */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="content-card"
      >
        <h2 className="section-title">Support Groups</h2>
        <div className="space-y-4">
          {supportGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{group.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{group.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2">👥 {group.members} members</span>
                    <span className="flex items-center gap-2">📅 Next: {group.nextMeeting}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="support-button"
                >
                  Join Group
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Selected Peer Modal */}
      <AnimatePresence>
        {selectedPeer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="content-card max-w-md w-full mx-4"
            >
              <div className="text-center mb-6">
                <span className="text-5xl mb-3 block">{selectedPeer.avatar}</span>
                <h3 className="text-2xl font-bold mb-2">{selectedPeer.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedPeer.description}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Compatibility: {selectedPeer.compatibility}%</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${selectedPeer.compatibility}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-3">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPeer.specialties.map((specialty) => (
                      <span 
                        key={specialty}
                        className="bg-gradient-to-r from-primary/20 to-yellow-400/20 text-primary text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startConversation}
                  className="support-button flex-1"
                >
                  Start Conversation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPeer(null)}
                  className="bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl text-base shadow-md hover:bg-gray-400 transition-all duration-200 flex-1"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Community Guidelines */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="content-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
      >
        <h2 className="section-title text-blue-800">Community Guidelines</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-green-500 mt-1">💚</span>
            <span>Be kind, respectful, and supportive</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">💬</span>
            <span>Share from your own experience, not as medical advice</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 mt-1">🔒</span>
            <span>Respect others' privacy and boundaries</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 mt-1">🚨</span>
            <span>Report any concerning behavior immediately</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-yellow-500 mt-1">🤝</span>
            <span>Remember: We're all here to support each other</span>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}

export default PeerSupportHub 