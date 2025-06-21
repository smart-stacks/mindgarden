import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CrisisState {
  isCrisisMode: boolean
  riskScore: number
  crisisType: string
  lastCrisisTime: Date | null
  emergencyContacts: string[]
}

interface CrisisContextType {
  crisisState: CrisisState
  setCrisisMode: (isCrisis: boolean) => void
  setRiskScore: (score: number) => void
  setCrisisType: (type: string) => void
  addEmergencyContact: (contact: string) => void
  clearCrisis: () => void
}

const CrisisContext = createContext<CrisisContextType | undefined>(undefined)

export const useCrisis = () => {
  const context = useContext(CrisisContext)
  if (context === undefined) {
    throw new Error('useCrisis must be used within a CrisisProvider')
  }
  return context
}

interface CrisisProviderProps {
  children: ReactNode
}

export const CrisisProvider: React.FC<CrisisProviderProps> = ({ children }) => {
  const [crisisState, setCrisisState] = useState<CrisisState>({
    isCrisisMode: false,
    riskScore: 0,
    crisisType: '',
    lastCrisisTime: null,
    emergencyContacts: ['988', '911']
  })

  const setCrisisMode = (isCrisis: boolean) => {
    setCrisisState(prev => ({
      ...prev,
      isCrisisMode: isCrisis,
      lastCrisisTime: isCrisis ? new Date() : prev.lastCrisisTime
    }))
  }

  const setRiskScore = (score: number) => {
    setCrisisState(prev => ({
      ...prev,
      riskScore: score,
      isCrisisMode: score > 6
    }))
  }

  const setCrisisType = (type: string) => {
    setCrisisState(prev => ({
      ...prev,
      crisisType: type
    }))
  }

  const addEmergencyContact = (contact: string) => {
    setCrisisState(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, contact]
    }))
  }

  const clearCrisis = () => {
    setCrisisState(prev => ({
      ...prev,
      isCrisisMode: false,
      riskScore: 0,
      crisisType: ''
    }))
  }

  const value: CrisisContextType = {
    crisisState,
    setCrisisMode,
    setRiskScore,
    setCrisisType,
    addEmergencyContact,
    clearCrisis
  }

  return (
    <CrisisContext.Provider value={value}>
      {children}
    </CrisisContext.Provider>
  )
} 