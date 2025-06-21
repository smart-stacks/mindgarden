import React from 'react'
import ChatInterface from '../components/ChatInterface.tsx'

const ChatPage: React.FC = () => {
  return (
    <div className="h-full bg-white/50 rounded-2xl shadow-lg border border-white/20">
      <ChatInterface />
    </div>
  )
}

export default ChatPage 