import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const TopNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/agents', label: 'Meet the Agents' },
    { path: '/faq', label: 'FAQ' },
  ]
  
  const emergencyItem = { path: '/emergency', label: 'Emergency', icon: '🚨', isEmergency: true }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-gradient-nav shadow-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Always routes to homepage */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <h1 className="text-2xl font-bold text-gray-800">
                🌱 MindGarden
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation & Emergency Button */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium relative 
                  after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2
                  hover:after:w-full
                  ${
                  location.pathname === item.path
                    ? 'text-primary-dark after:w-full'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={emergencyItem.path}
              className="emergency-button"
            >
              <span className="mr-2">{emergencyItem.icon}</span>
              {emergencyItem.label}
            </Link>
          </div>

          {/* Mobile Menu (Hamburger + Emergency) */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to={emergencyItem.path}
              className="emergency-button"
            >
               {emergencyItem.icon}
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                key={emergencyItem.path}
                to={emergencyItem.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium bg-gradient-to-r from-emergency to-emergency-dark text-white"
              >
                <span className="text-lg">{emergencyItem.icon}</span>
                <span>{emergencyItem.label}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default TopNavigation 