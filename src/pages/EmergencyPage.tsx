import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const EmergencyPage: React.FC = () => {
  const quickLinks = [
    {
      id: 1,
      title: 'Call Hotline (988)',
      icon: '📞',
      action: () => window.open('tel:988', '_self'),
      color: 'from-emergency to-emergency-dark'
    },
    {
      id: 2,
      title: 'Text Crisis Line',
      icon: '💬',
      action: () => window.open('sms:988', '_self'),
      color: 'from-warning to-warning-dark'
    },
    {
      id: 3,
      title: 'Find Nearby Emergency Room',
      icon: '🏥',
      action: () => alert('Finding nearby emergency rooms...'),
      color: 'from-primary to-primary-dark'
    },
    {
      id: 4,
      title: 'Contact Emergency Services (911)',
      icon: '🚨',
      action: () => window.open('tel:911', '_self'),
      color: 'from-emergency to-emergency-dark'
    }
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="content-card bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
        >
          <div className="text-6xl mb-6">🚨</div>
          <h1 className="section-title text-red-800">Crisis Help Panel</h1>
          <p className="text-lg text-gray-600 mb-8">
            Immediate crisis intervention and emergency mental health resources.
          </p>
          
          {/* Big Pulsing Red Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="crisis-button text-2xl py-6 px-8"
              onClick={() => window.open('tel:988', '_self')}
            >
              🚨 GET HELP NOW 🚨
            </motion.button>
          </motion.div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={link.action}
                className={`bg-gradient-to-r ${link.color} text-white font-bold py-4 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}
              >
                <div className="text-2xl mb-2">{link.icon}</div>
                <div className="text-sm">{link.title}</div>
              </motion.button>
            ))}
          </div>

          {/* De-escalation Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-success to-success-dark text-white font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => window.location.href = '/'}
            >
              ✅ I'm Safe Now
            </motion.button>
          </motion.div>

          {/* Location-based placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white rounded-xl p-4 border border-gray-200"
          >
            <h3 className="font-semibold text-gray-800 mb-2">📍 Location Services</h3>
            <p className="text-sm text-gray-600">
              Finding nearby mental health resources and emergency services...
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl hover:from-primary-dark hover:to-primary transition-all duration-200 shadow-md hover:scale-105"
            >
              <span>←</span>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default EmergencyPage 