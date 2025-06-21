import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AgentStatusMonitor: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemHealth] = useState({
    status: 'operational',
    uptime: '99.9%',
    activeConnections: 12,
    responseTime: '45ms'
  })

  const agents = [
    {
      id: 1,
      name: 'Crisis Detection Agent',
      status: 'active',
      load: 45,
      lastActivity: 'Just now',
      icon: '🧠'
    },
    {
      id: 2,
      name: 'Escalation Agent',
      status: 'idle',
      load: 12,
      lastActivity: '2 min ago',
      icon: '🚨'
    },
    {
      id: 3,
      name: 'Support Agent',
      status: 'active',
      load: 78,
      lastActivity: 'Just now',
      icon: '💬'
    },
    {
      id: 4,
      name: 'Follow-Up Agent',
      status: 'busy',
      load: 92,
      lastActivity: '1 min ago',
      icon: '📆'
    }
  ]

  const currentProcess = [
    { step: 'Sentiment Analysis', status: 'completed', time: '2.3s' },
    { step: 'Crisis Assessment', status: 'in-progress', time: '1.8s' },
    { step: 'Response Generation', status: 'pending', time: '0s' },
    { step: 'Escalation Check', status: 'pending', time: '0s' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-500 bg-green-50'
      case 'busy': return 'border-yellow-500 bg-yellow-50'
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Agent Status Monitor</h1>
          <p className="text-gray-600">Real-time monitoring of AI mental health support agents</p>
          <div className="text-sm text-gray-500 mt-2">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* System Health Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">System Health</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{systemHealth.status}</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{systemHealth.uptime}</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{systemHealth.activeConnections}</div>
              <div className="text-sm text-gray-600">Active Connections</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">{systemHealth.responseTime}</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
          </div>
        </motion.div>

        {/* Agent Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`agent-status ${getStatusColor(agent.status)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{agent.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{agent.name}</h3>
                    <div className="flex items-center gap-2">
                      <span>{getStatusIcon(agent.status)}</span>
                      <span className="text-sm text-gray-600 capitalize">{agent.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
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

        {/* Current Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Process Flow</h2>
          <div className="space-y-3">
            {currentProcess.map((step) => (
              <div key={step.step} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'in-progress' ? 'bg-yellow-500 animate-pulse' :
                    'bg-gray-300'
                  }`}></div>
                  <span className="font-medium text-gray-800">{step.step}</span>
                </div>
                <div className="text-sm text-gray-600">{step.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AgentStatusMonitor 