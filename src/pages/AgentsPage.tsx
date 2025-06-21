import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AgentsPage: React.FC = () => {
  const agents = [
    {
      id: 1,
      name: 'Crisis Detection Agent',
      icon: '🧠',
      description: 'Monitors user sentiment in real-time.',
      color: 'from-emergency to-emergency-dark'
    },
    {
      id: 2,
      name: 'Escalation Agent',
      icon: '🚨',
      description: 'Coordinates emergency response if needed.',
      color: 'from-warning to-warning-dark'
    },
    {
      id: 3,
      name: 'Support Agent',
      icon: '💬',
      description: 'Provides helpful, empathetic conversations.',
      color: 'from-primary to-primary-dark'
    },
    {
      id: 4,
      name: 'Follow-Up Agent',
      icon: '📆',
      description: 'Schedules future check-ins and tracks recovery.',
      color: 'from-success to-success-dark'
    }
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="content-card"
        >
          <div className="text-6xl mb-6">🤖</div>
          <h1 className="section-title">Meet Our Agents</h1>
          <p className="text-lg text-gray-600 mb-8">
            Our AI-powered team works together to provide comprehensive mental health support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${agent.color} rounded-2xl flex items-center justify-center text-2xl`}>
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{agent.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{agent.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
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

export default AgentsPage 