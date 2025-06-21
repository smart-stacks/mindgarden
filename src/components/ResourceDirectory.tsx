import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Resource {
  id: string
  name: string
  type: 'therapist' | 'crisis_center' | 'support_group' | 'hotline'
  distance: string
  description: string
  phone: string
  address: string
  insurance: string
  availability: string
  rating: number
  cost: string
  specialties: string[]
}

const ResourceDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showMap, setShowMap] = useState(false)

  const resources: Resource[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson, LCSW',
      type: 'therapist',
      distance: '0.8 miles',
      description: 'Licensed clinical social worker specializing in crisis intervention and trauma therapy.',
      phone: '(555) 123-4567',
      address: '123 Main St, City, State',
      insurance: 'Most plans accepted',
      availability: 'Next available: Today 3 PM',
      rating: 4.8,
      cost: '$150/session',
      specialties: ['Crisis Intervention', 'Trauma Therapy', 'Anxiety', 'Depression']
    },
    {
      id: '2',
      name: 'Hope Crisis Center',
      type: 'crisis_center',
      distance: '1.2 miles',
      description: '24/7 crisis intervention and walk-in mental health services.',
      phone: '(555) 123-HOPE',
      address: '456 Oak Ave, City, State',
      insurance: 'Free services',
      availability: '24/7',
      rating: 4.9,
      cost: 'Free',
      specialties: ['Crisis Intervention', 'Emergency Services', 'Walk-in Support']
    },
    {
      id: '3',
      name: 'Community Mental Health Clinic',
      type: 'therapist',
      distance: '2.1 miles',
      description: 'Sliding scale mental health services for all income levels.',
      phone: '(555) 456-7890',
      address: '789 Pine St, City, State',
      insurance: 'Sliding scale',
      availability: 'Next available: Tomorrow 10 AM',
      rating: 4.6,
      cost: '$20-80/session',
      specialties: ['Sliding Scale', 'General Mental Health', 'Family Therapy']
    },
    {
      id: '4',
      name: 'Anxiety & Depression Support Group',
      type: 'support_group',
      distance: '1.5 miles',
      description: 'Weekly peer support group for anxiety and depression.',
      phone: '(555) 789-0123',
      address: '321 Elm St, City, State',
      insurance: 'Free',
      availability: 'Tuesdays 7 PM',
      rating: 4.7,
      cost: 'Free',
      specialties: ['Peer Support', 'Anxiety', 'Depression', 'Group Therapy']
    }
  ]

  const resourceTypes = [
    { value: 'all', label: 'All Resources', icon: '📚' },
    { value: 'therapist', label: 'Therapists', icon: '👩‍⚕️' },
    { value: 'crisis_center', label: 'Crisis Centers', icon: '🚨' },
    { value: 'support_group', label: 'Support Groups', icon: '🤝' },
    { value: 'hotline', label: 'Hotlines', icon: '📞' }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === 'all' || resource.type === selectedType
    return matchesSearch && matchesType
  })

  const handleBookAppointment = (resource: Resource) => {
    if (resource.type === 'therapist') {
      alert(`Booking appointment with ${resource.name}. Phone: ${resource.phone}`)
    } else {
      alert(`Contacting ${resource.name}. Phone: ${resource.phone}`)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'therapist': return '👩‍⚕️'
      case 'crisis_center': return '🚨'
      case 'support_group': return '🤝'
      case 'hotline': return '📞'
      default: return '📚'
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
            ⭐
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-6">📚</div>
        <h1 className="section-title">Resource Directory</h1>
        <p className="text-lg text-gray-600">
          Find mental health professionals and support services near you
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="content-card"
      >
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for therapists, crisis centers, support groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar pl-12"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-3">
            {resourceTypes.map((type) => (
              <motion.button
                key={type.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(type.value)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  selectedType === type.value
                    ? 'bg-gradient-to-r from-primary to-yellow-400 text-white border-primary shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Map Toggle */}
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMap(!showMap)}
              className="support-button"
            >
              {showMap ? '📋 List View' : '🗺️ Map View'}
            </motion.button>
            
            <div className="text-sm text-gray-600 font-medium">
              {filteredResources.length} resources found
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resources List */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="resource-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-yellow-400 rounded-2xl flex items-center justify-center text-2xl">
                        {getTypeIcon(resource.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-xl">{resource.name}</h3>
                        <div className="text-right">
                          {renderStars(resource.rating)}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">📍 {resource.distance}</span>
                        <span className="flex items-center gap-1">💰 {resource.cost}</span>
                        <span className="flex items-center gap-1">📅 {resource.availability}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{resource.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <span className="text-primary">📞</span>
                        <span><strong>Phone:</strong> {resource.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-primary">📍</span>
                        <span><strong>Address:</strong> {resource.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-primary">🏥</span>
                        <span><strong>Insurance:</strong> {resource.insurance}</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <span className="text-primary">⏰</span>
                        <span><strong>Availability:</strong> {resource.availability}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-primary">🏷️</span>
                        <span><strong>Type:</strong> {resource.type.replace('_', ' ').toUpperCase()}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {resource.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="bg-gradient-to-r from-primary/20 to-yellow-400/20 text-primary text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookAppointment(resource)}
                    className="support-button whitespace-nowrap"
                  >
                    {resource.type === 'therapist' ? 'Book Appointment' : 'Contact'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(`tel:${resource.phone}`, '_self')}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-200"
                  >
                    📞 Call Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Map Placeholder */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="content-card"
          >
            <h2 className="section-title">Map View</h2>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-5xl mb-4">🗺️</div>
                <p className="text-lg font-medium">Interactive map showing nearby mental health resources</p>
                <p className="text-sm">(Map integration would be implemented here)</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Access */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="content-card bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
      >
        <h2 className="section-title text-red-800">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('tel:988', '_self')}
            className="crisis-button"
          >
            🚨 Crisis Hotline (988)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('tel:911', '_self')}
            className="crisis-button"
          >
            🚨 Emergency (911)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="support-button"
          >
            📋 Find Free Services
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="support-button"
          >
            🏥 Find Emergency Rooms
          </motion.button>
        </div>
      </motion.div>

      {/* Helpful Tips */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="content-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
      >
        <h2 className="section-title text-blue-800">Finding the Right Help</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">📞</span>
            <span>Call ahead to check availability and insurance acceptance</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 mt-1">💬</span>
            <span>Many providers offer free initial consultations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 mt-1">🚨</span>
            <span>Crisis centers provide immediate, free support</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 mt-1">🤝</span>
            <span>Support groups can be a great complement to therapy</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-yellow-500 mt-1">✨</span>
            <span>Don't hesitate to try multiple providers to find the right fit</span>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}

export default ResourceDirectory 