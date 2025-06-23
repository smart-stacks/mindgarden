import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation.tsx'
import { useAuth } from '../contexts/AuthContext'

interface Message {
  id: string
  text: string
  type: 'user' | 'ai' | 'system' | 'crisis'
  timestamp: Date
}

const ChatInterface: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  
  // Log authentication state for debugging purposes
  useEffect(() => {
    console.log('Auth state in ChatInterface:', { isAuthenticated, user })
  }, [isAuthenticated, user])
  
  // Function to get welcome message based on current auth state
  const getWelcomeMessage = () => {
    return user?.name 
      ? `Hello ${user.name}! I'm here to support you. How are you feeling today?`
      : 'Hello! I\'m here to support you. How are you feeling today?'
  }
  
  // Initialize messages with welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage(),
      type: 'ai',
      timestamp: new Date()
    }
  ])
  
  // Update first message when auth state changes
  useEffect(() => {
    setMessages(prevMessages => {
      // Create a copy of the messages array
      const updatedMessages = [...prevMessages]
      // Update the first message if it exists
      if (updatedMessages.length > 0) {
        updatedMessages[0] = {
          ...updatedMessages[0],
          text: getWelcomeMessage()
        }
      }
      return updatedMessages
    })
  }, [user, isAuthenticated])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      type: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I hear you. Thank you for sharing that with me. Would you like to talk more about how you\'re feeling?',
        type: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderMessage = (message: Message) => {
    const baseClasses = "message-bubble"
    
    switch (message.type) {
      case 'user':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-end"
          >
            <div className={`${baseClasses} user-message`}>
              <p className="text-white">{message.text}</p>
              <p className="text-xs text-blue-100 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        )
      
      case 'ai':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`${baseClasses} ai-message`}>
              <p className="text-gray-600">{message.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        )
      
      case 'system':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="system-notification max-w-md mx-auto mb-4"
          >
            <p className="text-sm italic">{message.text}</p>
          </motion.div>
        )
      
      case 'crisis':
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="crisis-alert max-w-md mx-auto mb-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🚨</span>
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-6 rounded-t-2xl">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">You're not alone</h1>
        </div>
        <p className="text-md text-gray-600 italic">
          We're here to support and guide you through anything.
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map(renderMessage)}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="ai-message max-w-xs"
          >
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-gray-500">AI is typing...</span>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isTyping}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="support-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface 