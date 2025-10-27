import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { 
  PlayIcon, 
  PauseIcon, 
  StopIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function StudyNow() {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [sessionType, setSessionType] = useState('focus') // focus, break, longBreak
  const [completedSessions, setCompletedSessions] = useState(0)

  useEffect(() => {
    let interval = null
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    } else if (time === 0 && isActive) {
      // Session completed
      handleSessionComplete()
    }
    
    return () => clearInterval(interval)
  }, [isActive, time])

  const handleSessionComplete = () => {
    setIsActive(false)
    setCompletedSessions(prev => prev + 1)
    
    // Switch session type
    if (sessionType === 'focus') {
      setSessionType(completedSessions % 4 === 3 ? 'longBreak' : 'break')
      setTime(sessionType === 'longBreak' ? 15 * 60 : 5 * 60)
    } else {
      setSessionType('focus')
      setTime(25 * 60)
    }
  }

  const startTimer = () => setIsActive(true)
  const pauseTimer = () => setIsActive(false)
  const resetTimer = () => {
    setIsActive(false)
    setTime(sessionType === 'focus' ? 25 * 60 : sessionType === 'break' ? 5 * 60 : 15 * 60)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getSessionColor = () => {
    switch(sessionType) {
      case 'focus': return 'from-blue-500 to-purple-600'
      case 'break': return 'from-green-500 to-teal-600'
      case 'longBreak': return 'from-orange-500 to-red-600'
      default: return 'from-blue-500 to-purple-600'
    }
  }

  const getSessionTitle = () => {
    switch(sessionType) {
      case 'focus': return 'Focus Session'
      case 'break': return 'Short Break'
      case 'longBreak': return 'Long Break'
      default: return 'Study Session'
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Now</h1>
          <p className="text-gray-600 mt-2">Pomodoro technique for focused study sessions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            <div className={`bg-gradient-to-br ${getSessionColor()} rounded-2xl p-8 text-white text-center`}>
              <h2 className="text-2xl font-semibold mb-4">{getSessionTitle()}</h2>
              
              {/* Timer Circle */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="h-64 w-64 rounded-full border-4 border-white border-opacity-30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{formatTime(time)}</div>
                    <p className="text-white text-opacity-80">
                      {isActive ? 'Stay focused!' : 'Ready to study?'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center space-x-4">
                {!isActive ? (
                  <button
                    onClick={startTimer}
                    className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Start Session
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <PauseIcon className="h-5 w-5 mr-2" />
                    Pause
                  </button>
                )}
                
                <button
                  onClick={resetTimer}
                  className="flex items-center px-6 py-3 bg-white bg-opacity-20 text-white rounded-full font-semibold hover:bg-opacity-30 transition-colors"
                >
                  <StopIcon className="h-5 w-5 mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="space-y-6">
            {/* Session Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed Sessions</span>
                  <span className="text-2xl font-bold text-blue-600">{completedSessions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Type</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                    {sessionType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Session</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {sessionType === 'focus' ? 'Break' : 'Focus'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Sessions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSessionType('focus')
                    setTime(25 * 60)
                    setIsActive(false)
                  }}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Focus Session</span>
                    <span className="text-sm text-gray-500">25:00</span>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setSessionType('break')
                    setTime(5 * 60)
                    setIsActive(false)
                  }}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Short Break</span>
                    <span className="text-sm text-gray-500">05:00</span>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setSessionType('longBreak')
                    setTime(15 * 60)
                    setIsActive(false)
                  }}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Long Break</span>
                    <span className="text-sm text-gray-500">15:00</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Study Tip</h4>
              <p className="text-yellow-700 text-sm">
                {sessionType === 'focus' 
                  ? 'Focus on one task. Avoid distractions during this session.'
                  : 'Take this time to relax. Stretch, hydrate, or take a short walk.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}