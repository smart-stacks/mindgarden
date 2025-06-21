import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All', icon: '🏥' },
    { id: 'insurance', label: 'Insurance', icon: '💳' },
    { id: 'availability', label: 'Available Now', icon: '⏰' },
    { id: 'specialty', label: 'Specialty', icon: '🎯' }
  ]

  const therapists = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      distance: '0.8 miles',
      specialty: 'Anxiety & Depression',
      availability: 'Available Today',
      phone: '(555) 123-4567',
      insurance: 'Accepts most insurance',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      distance: '1.2 miles',
      specialty: 'Trauma & PTSD',
      availability: 'Next Week',
      phone: '(555) 234-5678',
      insurance: 'Sliding scale available',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      distance: '2.1 miles',
      specialty: 'Family Therapy',
      availability: 'Available Today',
      phone: '(555) 345-6789',
      insurance: 'Medicaid accepted',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      distance: '1.5 miles',
      specialty: 'Addiction Recovery',
      availability: 'Next Week',
      phone: '(555) 456-7890',
      insurance: 'Private pay only',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      distance: '0.5 miles',
      specialty: 'Child & Adolescent',
      availability: 'Available Today',
      phone: '(555) 567-8901',
      insurance: 'Accepts most insurance',
      rating: 4.9
    }
  ]

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self')
  }

  return (
    <div className="h-full">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search for therapists, clinics, or resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-gradient-to-r from-secondary to-secondary-dark rounded-xl p-6 mb-6 text-center text-white"
      >
        <div className="text-4xl mb-2">🗺️</div>
        <h3 className="font-semibold mb-2">Interactive Map</h3>
        <p className="text-sm opacity-90">
          View nearby mental health resources and facilities
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
        >
          Open Map
        </motion.button>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span>{filter.icon}</span>
            <span className="text-sm font-medium">{filter.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Therapist Listings */}
      <div className="space-y-4">
        {therapists.map((therapist, index) => (
          <motion.div
            key={therapist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="resource-card"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800">{therapist.name}</h3>
                  <span className="text-sm text-primary font-medium">★ {therapist.rating}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{therapist.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🎯</span>
                    <span>{therapist.specialty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>⏰</span>
                    <span>{therapist.availability}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💳</span>
                    <span>{therapist.insurance}</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCall(therapist.phone)}
                className="support-button text-sm py-2 px-4 ml-4"
              >
                📞 Call
              </motion.button>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              Phone: {therapist.phone}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 p-6 bg-gradient-to-r from-success to-success-dark rounded-xl text-white"
      >
        <div className="text-center">
          <div className="text-3xl mb-3">💡</div>
          <h3 className="font-semibold mb-2">Need More Help?</h3>
          <p className="text-sm opacity-90 mb-4">
            Explore crisis hotlines, support groups, and emergency mental health services
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
          >
            View All Resources
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default ResourcesPage 