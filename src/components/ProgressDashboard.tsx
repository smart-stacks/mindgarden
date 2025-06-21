import React, { useState } from 'react'
import { format } from 'date-fns'

interface MoodEntry {
  id: string
  date: Date
  mood: number
  notes: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: Date
}

const ProgressDashboard: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<number>(0)
  const [moodNotes, setMoodNotes] = useState('')
  const [showMoodCheck, setShowMoodCheck] = useState(false)

  // Mock data
  const moodHistory: MoodEntry[] = [
    { id: '1', date: new Date(2024, 0, 15), mood: 7, notes: 'Feeling hopeful today' },
    { id: '2', date: new Date(2024, 0, 14), mood: 5, notes: 'Struggling but managing' },
    { id: '3', date: new Date(2024, 0, 13), mood: 8, notes: 'Great day with friends' },
    { id: '4', date: new Date(2024, 0, 12), mood: 6, notes: 'Some anxiety but okay' },
    { id: '5', date: new Date(2024, 0, 11), mood: 4, notes: 'Rough day, needed support' },
  ]

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Step',
      description: 'Completed your first mood check-in',
      icon: '🌟',
      earned: true,
      earnedDate: new Date(2024, 0, 10)
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Checked in for 7 consecutive days',
      icon: '🔥',
      earned: true,
      earnedDate: new Date(2024, 0, 15)
    },
    {
      id: '3',
      title: 'Support Seeker',
      description: 'Reached out for help when needed',
      icon: '🤝',
      earned: true,
      earnedDate: new Date(2024, 0, 12)
    },
    {
      id: '4',
      title: 'Crisis Survivor',
      description: 'Successfully navigated a difficult moment',
      icon: '💪',
      earned: false
    },
    {
      id: '5',
      title: 'Community Builder',
      description: 'Connected with 3 peer supporters',
      icon: '👥',
      earned: false
    }
  ]

  const upcomingAppointments = [
    {
      id: '1',
      provider: 'Dr. Sarah Johnson',
      date: new Date(2024, 0, 16, 14, 0),
      type: 'Therapy Session',
      location: '123 Main St, City, State'
    },
    {
      id: '2',
      provider: 'Anxiety Support Group',
      date: new Date(2024, 0, 17, 19, 0),
      type: 'Group Session',
      location: '321 Elm St, City, State'
    }
  ]

  const handleMoodSubmit = () => {
    if (currentMood > 0) {
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        date: new Date(),
        mood: currentMood,
        notes: moodNotes
      }
      // In a real app, this would be saved to backend
      console.log('New mood entry:', newEntry)
      setCurrentMood(0)
      setMoodNotes('')
      setShowMoodCheck(false)
    }
  }

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return '😊'
    if (mood >= 6) return '🙂'
    if (mood >= 4) return '😐'
    if (mood >= 2) return '😔'
    return '😢'
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600'
    if (mood >= 6) return 'text-blue-600'
    if (mood >= 4) return 'text-yellow-600'
    if (mood >= 2) return 'text-orange-600'
    return 'text-red-600'
  }

  const averageMood = moodHistory.length > 0 
    ? moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length 
    : 0

  const streakDays = 12 // Mock data

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-4">📊</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Progress Dashboard</h1>
        <p className="text-lg text-gray-600">
          Track your mental health journey and celebrate your progress
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">📈</div>
          <h3 className="font-bold text-lg">Average Mood</h3>
          <p className={`text-2xl font-bold ${getMoodColor(averageMood)}`}>
            {averageMood.toFixed(1)}/10
          </p>
          <p className="text-sm text-gray-600">
            {averageMood >= 7 ? 'Great progress!' : 'Keep going!'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">🔥</div>
          <h3 className="font-bold text-lg">Check-in Streak</h3>
          <p className="text-2xl font-bold text-primary">{streakDays} days</p>
          <p className="text-sm text-gray-600">Keep it up!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="font-bold text-lg">Achievements</h3>
          <p className="text-2xl font-bold text-success">
            {achievements.filter(a => a.earned).length}/{achievements.length}
          </p>
          <p className="text-sm text-gray-600">Unlocked</p>
        </div>
      </div>

      {/* Quick Mood Check */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">How are you feeling today?</h2>
          <button
            onClick={() => setShowMoodCheck(!showMoodCheck)}
            className="support-button"
          >
            {showMoodCheck ? 'Cancel' : 'Check In'}
          </button>
        </div>

        {showMoodCheck && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">😢</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentMood}
                  onChange={(e) => setCurrentMood(Number(e.target.value))}
                  className="flex-1 mx-4"
                />
                <span className="text-sm text-gray-600">😊</span>
              </div>
              <div className="text-center mt-2">
                <span className={`text-2xl ${getMoodColor(currentMood)}`}>
                  {currentMood > 0 ? getMoodEmoji(currentMood) : '?'}
                </span>
                <span className="ml-2 font-bold">{currentMood}/10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Notes (optional)</label>
              <textarea
                value={moodNotes}
                onChange={(e) => setMoodNotes(e.target.value)}
                placeholder="How are you feeling? What's on your mind?"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
              />
            </div>

            <button
              onClick={handleMoodSubmit}
              disabled={currentMood === 0}
              className="support-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Mood Check
            </button>
          </div>
        )}
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Mood History</h2>
        <div className="space-y-3">
          {moodHistory.slice(0, 5).map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className={`text-2xl ${getMoodColor(entry.mood)}`}>
                  {getMoodEmoji(entry.mood)}
                </span>
                <div>
                  <p className="font-medium">{format(entry.date, 'MMM d, yyyy')}</p>
                  <p className="text-sm text-gray-600">{entry.notes}</p>
                </div>
              </div>
              <span className={`font-bold ${getMoodColor(entry.mood)}`}>
                {entry.mood}/10
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border-2 ${
                achievement.earned 
                  ? 'border-success bg-success bg-opacity-10' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl mb-2 ${achievement.earned ? '' : 'opacity-30'}`}>
                  {achievement.icon}
                </div>
                <h3 className={`font-bold ${achievement.earned ? 'text-success' : 'text-gray-400'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                  {achievement.description}
                </p>
                {achievement.earned && achievement.earnedDate && (
                  <p className="text-xs text-success mt-2">
                    Earned {format(achievement.earnedDate, 'MMM d')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
        <div className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{appointment.provider}</h3>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                  <p className="text-sm text-gray-500">{appointment.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">
                    {format(appointment.date, 'MMM d, h:mm a')}
                  </p>
                  <button className="support-button text-sm mt-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Insights */}
      <div className="bg-accent rounded-lg p-6">
        <h2 className="text-xl font-bold mb-3">Your Progress Insights</h2>
        <ul className="space-y-2 text-sm">
          <li>• You've been checking in consistently for {streakDays} days</li>
          <li>• Your average mood has improved by 0.5 points this week</li>
          <li>• You've earned 3 achievements this month</li>
          <li>• Next milestone: 30-day check-in streak</li>
        </ul>
      </div>
    </div>
  )
}

export default ProgressDashboard 