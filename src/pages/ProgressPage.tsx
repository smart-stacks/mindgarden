import React from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation.tsx'

const ProgressPage: React.FC = () => {
  const achievements = [
    { id: 1, title: 'First Week', description: 'Completed 7 days of check-ins', icon: '🌟', unlocked: true },
    { id: 2, title: 'Mood Tracker', description: 'Tracked mood for 30 days', icon: '📊', unlocked: true },
    { id: 3, title: 'Support Seeker', description: 'Reached out for help 5 times', icon: '🤝', unlocked: true },
    { id: 4, title: 'Mindfulness Master', description: 'Completed 10 meditation sessions', icon: '🧘', unlocked: false },
    { id: 5, title: 'Crisis Survivor', description: 'Successfully navigated a difficult time', icon: '💪', unlocked: false }
  ]

  const upcomingAppointments = [
    { id: 1, type: 'Therapy Session', date: 'Tomorrow, 2:00 PM', provider: 'Dr. Sarah Johnson' },
    { id: 2, type: 'Support Group', date: 'Friday, 6:00 PM', provider: 'Anxiety Support Group' },
    { id: 3, type: 'Check-in', date: 'Next Monday, 10:00 AM', provider: 'MindGarden AI' }
  ]

  return (
    <div className="h-full">
      {/* Streak Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-6 mb-6 text-center shadow-md"
      >
        <div className="text-4xl mb-2">🔥</div>
        <h2 className="text-2xl font-bold mb-1">23 Days</h2>
        <p className="text-sm opacity-90">Current Streak</p>
        <div className="mt-3 text-xs opacity-75">
          Your longest streak: 45 days
        </div>
      </motion.div>

      <div className="flex-1 p-4">
        {/* Mood Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="content-card mb-6"
        >
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            📈 Mood Trends
          </h3>
          <div className="bg-gradient-to-r from-secondary to-secondary-dark rounded-lg p-8 text-center text-white">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-semibold mb-2">Interactive Mood Chart</h4>
            <p className="text-sm opacity-90 mb-4">
              Track your emotional journey over time
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
            >
              View Detailed Chart
            </motion.button>
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="content-card mb-6"
        >
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            📅 Upcoming Appointments
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{appointment.type}</h4>
                  <p className="text-sm text-gray-600">{appointment.provider}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">{appointment.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="content-card"
        >
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            🏆 Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-success to-success-dark text-white'
                    : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className={`text-sm ${achievement.unlocked ? 'opacity-90' : 'opacity-75'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                {achievement.unlocked && (
                  <div className="mt-2 text-xs opacity-75">
                    ✅ Unlocked
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-secondary to-secondary-dark rounded-xl text-white text-center"
        >
          <div className="text-2xl mb-2">🎉</div>
          <h3 className="font-semibold mb-1">You're Making Progress!</h3>
          <p className="text-sm opacity-90">
            Keep up the great work. Every step forward counts.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressPage 