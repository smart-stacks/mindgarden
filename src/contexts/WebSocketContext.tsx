import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'

interface WebSocketState {
  isConnected: boolean
  agentStatus: Record<string, string>
  processUpdates: any[]
  lastUpdate: Date | null
}

interface WebSocketContextType {
  socket: Socket | null
  wsState: WebSocketState
  sendMessage: (message: string) => void
  connect: () => void
  disconnect: () => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export const useWebSocket = () => {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}

interface WebSocketProviderProps {
  children: ReactNode
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [wsState, setWsState] = useState<WebSocketState>({
    isConnected: false,
    agentStatus: {},
    processUpdates: [],
    lastUpdate: null
  })

  const connect = () => {
    const newSocket = io('ws://localhost:8000/ws/process-monitor', {
      transports: ['websocket'],
      timeout: 5000
    })

    newSocket.on('connect', () => {
      console.log('WebSocket connected')
      setWsState(prev => ({
        ...prev,
        isConnected: true
      }))
    })

    newSocket.on('disconnect', () => {
      console.log('WebSocket disconnected')
      setWsState(prev => ({
        ...prev,
        isConnected: false
      }))
    })

    newSocket.on('agent_status', (data: Record<string, string>) => {
      setWsState(prev => ({
        ...prev,
        agentStatus: data,
        lastUpdate: new Date()
      }))
    })

    newSocket.on('process_update', (data: any) => {
      setWsState(prev => ({
        ...prev,
        processUpdates: [...prev.processUpdates, data],
        lastUpdate: new Date()
      }))
    })

    newSocket.on('crisis_alert', (data: any) => {
      console.log('Crisis alert received:', data)
      // Handle crisis alerts
    })

    setSocket(newSocket)
  }

  const disconnect = () => {
    if (socket) {
      socket.disconnect()
      setSocket(null)
    }
  }

  const sendMessage = (message: string) => {
    if (socket && wsState.isConnected) {
      socket.emit('message', message)
    }
  }

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [])

  const value: WebSocketContextType = {
    socket,
    wsState,
    sendMessage,
    connect,
    disconnect
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
} 