import React from 'react'
import { motion } from 'framer-motion'

const EmergencyCrisisInterface: React.FC = () => {
  return (
    <div className="emergency-overlay">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="crisis-card"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🚨</div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">Crisis Alert</h2>
          <p className="text-gray-600 mb-6">
            We've detected signs of distress. Help is available and you're not alone.
          </p>
          
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="crisis-button w-full"
              onClick={() => window.open('tel:988', '_self')}
            >
              Call Crisis Hotline (988)
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="support-button w-full"
              onClick={() => window.open('tel:911', '_self')}
            >
              Call Emergency Services (911)
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-success to-success-dark text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 w-full"
            >
              I'm Safe Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EmergencyCrisisInterface 