import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation.tsx'

const MonitorPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const agents = [
    {
      id: 1,
      name: 'Crisis Detection Agent',
      icon: '🧠',
      status: 'active',
      statusText: 'Monitoring',
      lastActivity: 'Just now',
      load: 45,
      color: 'from-emergency to-emergency-dark'
    },
    {
      id: 2,
      name: 'Escalation Agent',
      icon: '🚨',
      status: 'idle',
      statusText: 'Standby',
      lastActivity: '2 min ago',
      load: 12,
      color: 'from-warning to-warning-dark'
    },
    {
      id: 3,
      name: 'Support Agent',
      icon: '💬',
      status: 'active',
      statusText: 'In Conversation',
      lastActivity: 'Just now',
      load: 78,
      color: 'from-primary to-primary-dark'
    },
    {
      id: 4,
      name: 'Follow-Up Agent',
      icon: '📆',
      status: 'busy',
      statusText: 'Processing',
      lastActivity: '1 min ago',
      load: 92,
      color: 'from-success to-success-dark'
    },
    {
      id: 5,
      name: 'Data Analysis Agent',
      icon: '📊',
      status: 'active',
      statusText: 'Analyzing',
      lastActivity: 'Just now',
      load: 34,
      color: 'from-secondary to-secondary-dark'
    }
  ]

  const activityLog = [
    { id: 1, time: '14:32:15', agent: 'Support Agent', action: 'Started conversation with user', type: 'info' },
    { id: 2, time: '14:31:42', agent: 'Crisis Detection', action: 'Sentiment analysis completed', type: 'success' },
    { id: 3, time: '14:31:18', agent: 'Follow-Up Agent', action: 'Scheduled check-in reminder', type: 'info' },
    { id: 4, time: '14:30:55', agent: 'Escalation Agent', action: 'Emergency protocol activated', type: 'warning' },
    { id: 5, time: '14:30:23', agent: 'Data Analysis', action: 'Pattern recognition update', type: 'success' },
    { id: 6, time: '14:29:47', agent: 'Support Agent', action: 'Conversation ended', type: 'info' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-success bg-success/10'
      case 'busy': return 'border-warning bg-warning/10'
      case 'idle': return 'border-gray-400 bg-gray-50'
      default: return 'border-gray-400 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢'
      case 'busy': return '🟡'
      case 'idle': return '⚪'
      default: return '⚪'
    }
  }

  return (
    <div className="h-full">
      {/* System Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-4 mb-6 text-center shadow-md"
      >
        <div className="text-2xl mb-2">⚡</div>
        <h2 className="font-semibold mb-1">System Status: Operational</h2>
        <p className="text-sm opacity-90">All agents running smoothly</p>
      </motion.div>

      <div className="flex-1 p-4">
        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`agent-status ${getStatusColor(agent.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${agent.color} rounded-lg flex items-center justify-center text-lg`}>
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{agent.name}</h3>
                    <div className="flex items-center gap-2">
                      <span>{getStatusIcon(agent.status)}</span>
                      <span className="text-sm text-gray-600">{agent.statusText}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Load:</span>
                  <span className="font-medium text-gray-800">{agent.load}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${agent.load}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  Last activity: {agent.lastActivity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="content-card mb-6"
        >
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            🔴 Live Updates
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Real-time monitoring active</span>
            </div>
            <div className="text-sm text-gray-600">
              <p>• 3 active conversations</p>
              <p>• 12 sentiment analyses completed today</p>
              <p>• 2 crisis interventions prevented</p>
              <p>• System uptime: 99.9%</p>
            </div>
          </div>
        </motion.div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="content-card"
        >
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            📋 Activity Log Stream
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {activityLog.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05, duration: 0.3 }}
                className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100"
              >
                <span className="text-xs text-gray-500 font-mono">{log.time}</span>
                <span className="text-sm font-medium text-gray-700">{log.agent}</span>
                <span className="text-sm text-gray-600 flex-1">{log.action}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  log.type === 'warning' ? 'bg-warning text-white' :
                  log.type === 'success' ? 'bg-success text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {log.type}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-lg hover:shadow-md transition-all duration-200"
            >
              View Full Log
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MonitorPage 