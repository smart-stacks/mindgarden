import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import TopNavigation from './components/TopNavigation.tsx'
import Navigation from './components/Navigation.tsx'
import ChatPage from './pages/ChatPage.tsx'
import PeersPage from './pages/PeersPage.tsx'
import ResourcesPage from './pages/ResourcesPage.tsx'
import ProgressPage from './pages/ProgressPage.tsx'
import MonitorPage from './pages/MonitorPage.tsx'
import AgentsPage from './pages/AgentsPage.tsx'
import FAQPage from './pages/FAQPage.tsx'
import EmergencyPage from './pages/EmergencyPage.tsx'
import LoginPage from './pages/LoginPage.tsx'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background-soft">
        <header className="fixed top-0 left-0 right-0 z-50">
          <TopNavigation />
        </header>

        <main className="pt-28 pb-28">
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/peers" element={<PeersPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/monitor" element={<MonitorPage />} />
          </Routes>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-nav shadow-nav border-t border-gray-200/50">
          <div className="max-w-md mx-auto">
            <Navigation />
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App 