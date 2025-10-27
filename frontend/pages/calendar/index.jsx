import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [view, setView] = useState('month')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Mock tasks with due dates
  const mockTasks = [
    {
      id: 1,
      title: 'Physics Homework',
      subject: 'Physics',
      dueDate: '2024-01-15T18:00',
      priority: 'high',
      status: 'pending',
      estimatedMinutes: 120,
      description: 'Complete chapters 5-7 problems',
      notes: 'Focus on chapter 6 problems first'
    },
    {
      id: 2,
      title: 'Biology Reading',
      subject: 'Biology',
      dueDate: '2024-01-16T10:00',
      priority: 'medium',
      status: 'pending',
      estimatedMinutes: 90,
      description: 'Read chapter 5 on cell structure',
      notes: 'Create flashcards for key terms'
    },
    {
      id: 3,
      title: 'Math Problem Set',
      subject: 'Mathematics',
      dueDate: '2024-01-20T14:00',
      priority: 'low',
      status: 'pending',
      estimatedMinutes: 180,
      description: 'Calculus derivatives practice',
      notes: 'Problems 1-15 from textbook'
    },
    {
      id: 4,
      title: 'English Essay',
      subject: 'English',
      dueDate: '2024-01-14T16:00',
      priority: 'high',
      status: 'completed',
      estimatedMinutes: 120,
      description: '500-word climate change essay',
      notes: 'Submitted via online portal'
    },
    {
      id: 5,
      title: 'History Research',
      subject: 'History',
      dueDate: '2024-01-18T12:00',
      priority: 'medium',
      status: 'pending',
      estimatedMinutes: 240,
      description: 'World War II research paper',
      notes: 'Need to visit library for primary sources'
    },
    {
      id: 6,
      title: 'Programming Project',
      subject: 'Programming',
      dueDate: '2024-01-22T23:59',
      priority: 'high',
      status: 'pending',
      estimatedMinutes: 300,
      description: 'React todo application',
      notes: 'Follow React best practices'
    },
    {
      id: 7,
      title: 'Chemistry Lab Report',
      subject: 'Chemistry',
      dueDate: '2024-01-10T15:00',
      priority: 'medium',
      status: 'completed',
      estimatedMinutes: 150,
      description: 'Acid-base titration experiment',
      notes: 'Lab completed successfully'
    },
    {
      id: 8,
      title: 'Literature Analysis',
      subject: 'Literature',
      dueDate: '2024-01-08T11:00',
      priority: 'low',
      status: 'completed',
      estimatedMinutes: 120,
      description: 'Shakespeare sonnet analysis',
      notes: 'Focused on Sonnet 18'
    }
  ]

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    if (view === 'year') {
      setSelectedYear(currentDate.getFullYear())
    } else if (view === 'month') {
      setSelectedYear(currentDate.getFullYear())
      setSelectedMonth(currentDate.getMonth())
    }
  }, [currentDate, view])

  const loadTasks = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setTasks(mockTasks)
    setLoading(false)
  }

  // Navigation functions
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    switch (view) {
      case 'year':
        newDate.setFullYear(newDate.getFullYear() - 1)
        break
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1)
        break
      case 'week':
        newDate.setDate(newDate.getDate() - 7)
        break
      case 'day':
        newDate.setDate(newDate.getDate() - 1)
        break
    }
    setCurrentDate(newDate)
  }

  const goToNext = () => {
    const newDate = new Date(currentDate)
    switch (view) {
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + 1)
        break
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1)
        break
      case 'week':
        newDate.setDate(newDate.getDate() + 7)
        break
      case 'day':
        newDate.setDate(newDate.getDate() + 1)
        break
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
    setSelectedYear(today.getFullYear())
    setSelectedMonth(today.getMonth())
  }

  const handleYearChange = (year) => {
    setSelectedYear(year)
    const newDate = new Date(currentDate)
    newDate.setFullYear(year)
    setCurrentDate(newDate)
  }

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
    const newDate = new Date(currentDate)
    newDate.setMonth(month)
    setCurrentDate(newDate)
  }

  // Format date for URL parameter
  const formatDateForURL = (date) => {
    if (!date) return ''
    return date.toISOString().split('T')[0] // YYYY-MM-DD format
  }

  // Check if a date is before today
  const isDateBeforeToday = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    return compareDate < today
  }

  // Handle Add Task with date validation
  const handleAddTask = (date = null) => {
    const targetDate = date || selectedDate || new Date()
    
    // Don't allow adding tasks for dates before today
    if (isDateBeforeToday(targetDate)) {
      alert('Cannot add tasks for past dates. Please select today or a future date.')
      return
    }
    
    const dateParam = formatDateForURL(targetDate)
    const url = dateParam ? `/tasks/new?date=${dateParam}` : '/tasks/new'
    router.push(url)
  }

  // Calendar generation functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getMonthYearString = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const getWeekRangeString = (date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  }

  const getDayString = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date) => {
    if (!date || !selectedDate) return false
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear()
  }

  const getTasksForDate = (date) => {
    if (!date) return []
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate)
      return taskDate.getDate() === date.getDate() &&
             taskDate.getMonth() === date.getMonth() &&
             taskDate.getFullYear() === date.getFullYear()
    })
  }

  const getTasksForWeek = (date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate)
      return taskDate >= startOfWeek && taskDate <= endOfWeek
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status) => {
    return status === 'completed' 
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800'
  }

  const getSubjectColor = (subject) => {
    const colors = {
      'Physics': 'bg-blue-100 text-blue-800',
      'Biology': 'bg-green-100 text-green-800',
      'Mathematics': 'bg-purple-100 text-purple-800',
      'English': 'bg-red-100 text-red-800',
      'History': 'bg-yellow-100 text-yellow-800',
      'Programming': 'bg-indigo-100 text-indigo-800',
      'Chemistry': 'bg-pink-100 text-pink-800',
      'Literature': 'bg-orange-100 text-orange-800'
    }
    return colors[subject] || 'bg-gray-100 text-gray-800'
  }

  // Generate calendar views
  const generateMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const calendar = []

    for (let i = 0; i < firstDay; i++) {
      calendar.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      calendar.push(date)
    }

    return calendar
  }

  const generateWeekView = () => {
    const week = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      week.push(date)
    }
    
    return week
  }

  const generateYearView = () => {
    const months = []
    for (let month = 0; month < 12; month++) {
      months.push(new Date(selectedYear, month, 1))
    }
    return months
  }

  // Task Modal Component
  const TaskModal = () => {
    if (!selectedDate) return null

    const dateTasks = getTasksForDate(selectedDate)
    const isPastDate = isDateBeforeToday(selectedDate)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Tasks for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <button
              onClick={() => setIsTaskModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {dateTasks.length > 0 ? (
              <div className="space-y-4">
                {dateTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getPriorityColor(task.priority)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSubjectColor(task.subject)}`}>
                          {task.subject}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          {Math.floor(task.estimatedMinutes / 60)}h {task.estimatedMinutes % 60}m
                        </span>
                      </div>
                      {task.notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                          <strong>Notes:</strong> {task.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks scheduled</h3>
                <p className="text-gray-500 mb-6">You don't have any tasks scheduled for this day.</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
              {!isPastDate && (
                <button 
                  onClick={() => {
                    setIsTaskModalOpen(false)
                    handleAddTask(selectedDate)
                  }}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  {dateTasks.length > 0 ? 'Add Another Task' : 'Add Task for This Day'}
                </button>
              )}
              <button 
                onClick={() => setIsTaskModalOpen(false)}
                className={`${!isPastDate ? 'flex-1' : 'w-full'} bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2`}
              >
                <XMarkIcon className="h-5 w-5" />
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Task Preview Component
  const TaskPreview = ({ tasks, maxTasks = 2 }) => {
    const visibleTasks = tasks.slice(0, maxTasks)
    const hiddenCount = tasks.length - maxTasks

    return (
      <div className="mt-1 space-y-1">
        {visibleTasks.map((task, index) => (
          <div
            key={index}
            className={`text-xs p-1 rounded truncate ${getSubjectColor(task.subject)}`}
            title={`${task.title} - ${task.subject}`}
          >
            {task.title}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div className="text-xs text-gray-500 text-center">
            +{hiddenCount} more
          </div>
        )}
      </div>
    )
  }

  // Month View Component
  const MonthView = () => {
    const calendar = generateMonthView()

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-4 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendar.map((date, index) => (
            <div
              key={index}
              className={`min-h-[120px] border-r border-b border-gray-200 p-2 ${
                date ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
              } ${
                isToday(date) ? 'bg-blue-50' : ''
              } ${
                isSelected(date) ? 'ring-2 ring-blue-500' : ''
              } transition-colors`}
              onClick={() => {
                if (date) {
                  setSelectedDate(date)
                  setIsTaskModalOpen(true)
                }
              }}
            >
              {date && (
                <>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-medium ${
                      isToday(date) ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </span>
                    {getTasksForDate(date).length > 0 && (
                      <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                        {getTasksForDate(date).length}
                      </span>
                    )}
                  </div>
                  
                  <TaskPreview tasks={getTasksForDate(date)} />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Week View Component
  const WeekView = () => {
    const week = generateWeekView()
    const weekTasks = getTasksForWeek(currentDate)

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-8 bg-gray-50 border-b border-gray-200">
          <div className="p-4 text-sm font-medium text-gray-700 border-r border-gray-200">Time</div>
          {week.map((date, index) => (
            <div
              key={index}
              className={`p-4 text-center text-sm font-medium ${
                isToday(date) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              } ${
                isSelected(date) ? 'ring-2 ring-blue-500' : ''
              } border-r border-gray-200 cursor-pointer`}
              onClick={() => {
                setSelectedDate(date)
                setIsTaskModalOpen(true)
              }}
            >
              <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="text-lg font-bold">{date.getDate()}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
          <div className="bg-gray-50 border-r border-gray-200 p-4 text-sm text-gray-500">
            All Day
          </div>
          {week.map((date, index) => (
            <div
              key={index}
              className="min-h-[200px] border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                setSelectedDate(date)
                setIsTaskModalOpen(true)
              }}
            >
              <TaskPreview tasks={getTasksForDate(date)} maxTasks={4} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Day View Component
  const DayView = () => {
    const dayTasks = getTasksForDate(currentDate)
    const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM
    const isPastDate = isDateBeforeToday(currentDate)

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {getDayString(currentDate)}
            </h3>
            {!isPastDate && (
              <button 
                onClick={() => handleAddTask(currentDate)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Add Task
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-2 bg-gray-50 border-r border-gray-200">
            {hours.map(hour => (
              <div key={hour} className="h-20 border-b border-gray-200 p-2 text-sm text-gray-500 flex items-center justify-end pr-4">
                {hour}:00
              </div>
            ))}
          </div>

          <div className="col-span-10">
            {hours.map(hour => (
              <div key={hour} className="h-20 border-b border-gray-200 p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  if (!isPastDate) {
                    const newDate = new Date(currentDate)
                    newDate.setHours(hour, 0, 0, 0)
                    handleAddTask(newDate)
                  }
                }}>
                {/* Time slots for scheduling */}
              </div>
            ))}
          </div>
        </div>

        {/* All day tasks */}
        <div className="border-t border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">All Day Tasks</h4>
          {dayTasks.length > 0 ? (
            <div className="space-y-3">
              {dayTasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedDate(new Date(task.dueDate))
                    setIsTaskModalOpen(true)
                  }}>
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{task.title}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getSubjectColor(task.subject)}`}>
                        {task.subject}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                {isPastDate ? 'No tasks scheduled for this day' : 'No tasks scheduled for today'}
              </p>
              {!isPastDate && (
                <button 
                  onClick={() => handleAddTask(currentDate)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add Your First Task
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Year View Component
  const YearView = () => {
    const months = generateYearView()
    const years = Array.from({ length: 9 }, (_, i) => selectedYear - 4 + i)

    return (
      <div className="space-y-6">
        {/* Year Selector */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {years.map(year => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  year === selectedYear
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Months Grid */}
        <div className="grid grid-cols-3 gap-6">
          {months.map((monthDate, index) => {
            const monthTasks = tasks.filter(task => {
              const taskDate = new Date(task.dueDate)
              return taskDate.getMonth() === index && taskDate.getFullYear() === selectedYear
            })

            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedMonth(index)
                  setView('month')
                  const newDate = new Date(selectedYear, index, 1)
                  setCurrentDate(newDate)
                }}
              >
                <h3 className="font-semibold text-gray-900 mb-3">
                  {monthDate.toLocaleDateString('en-US', { month: 'long' })}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  {monthTasks.length} task{monthTasks.length !== 1 ? 's' : ''}
                </div>
                {monthTasks.length > 0 && (
                  <div className="space-y-1">
                    {monthTasks.slice(0, 3).map(task => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded truncate ${getSubjectColor(task.subject)}`}
                      >
                        {task.title}
                      </div>
                    ))}
                    {monthTasks.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{monthTasks.length - 3} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Render current view
  const renderCurrentView = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-7 gap-4">
              {[...Array(35)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    switch (view) {
      case 'year':
        return <YearView />
      case 'month':
        return <MonthView />
      case 'week':
        return <WeekView />
      case 'day':
        return <DayView />
      default:
        return <MonthView />
    }
  }

  // Get current view title
  const getViewTitle = () => {
    switch (view) {
      case 'year':
        return selectedYear.toString()
      case 'month':
        return getMonthYearString(currentDate)
      case 'week':
        return getWeekRangeString(currentDate)
      case 'day':
        return getDayString(currentDate)
      default:
        return getMonthYearString(currentDate)
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Study Calendar</h1>
            <p className="text-gray-600 mt-2">Plan and track your study schedule</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={goToToday}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Today
            </button>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {['year', 'month', 'week', 'day'].map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    view === viewType
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {viewType}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handleAddTask()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <PlusIcon className="h-5 w-5" />
              Add Task
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goToPrevious}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              <h2 className="text-xl font-bold text-gray-900">
                {getViewTitle()}
              </h2>
              
              <button
                onClick={goToNext}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low Priority</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {renderCurrentView()}

        {/* Statistics Sidebar */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {tasks
                .filter(task => new Date(task.dueDate) > new Date() && task.status === 'pending')
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .slice(0, 5)
                .map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString()} • {task.subject}
                      </p>
                    </div>
                  </div>
                ))}
              {tasks.filter(task => new Date(task.dueDate) > new Date() && task.status === 'pending').length === 0 && (
                <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
              )}
            </div>
          </div>

          {/* Study History */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent History</h3>
            <div className="space-y-3">
              {tasks
                .filter(task => task.status === 'completed')
                .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
                .slice(0, 5)
                .map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        Completed on {new Date(task.dueDate).toLocaleDateString()} • {task.subject}
                      </p>
                    </div>
                  </div>
                ))}
              {tasks.filter(task => task.status === 'completed').length === 0 && (
                <p className="text-gray-500 text-center py-4">No completed tasks yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Task Modal */}
        {isTaskModalOpen && <TaskModal />}
      </div>
    </Layout>
  )
}