import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import { 
  BellIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const router = useRouter()

  // Enhanced mock notifications data
  const mockNotifications = [
    {
      id: 1,
      title: 'Task Due Soon: Physics Homework',
      message: 'Your Physics Homework is due in 2 hours',
      detailedMessage: 'This is a reminder that your Physics Homework assignment covering chapters 5-7 is due today at 6:00 PM. Make sure to complete all problems from chapters 5-7 and focus particularly on the chapter 6 problems as mentioned in your notes.',
      type: 'warning',
      timestamp: new Date('2024-01-15T16:00:00'),
      read: false,
      taskId: 1,
      subject: 'Physics',
      dueDate: '2024-01-15T18:00:00',
      priority: 'high',
      actionRequired: true,
      relatedTasks: [1]
    },
    {
      id: 2,
      title: 'Task Completed Successfully',
      message: 'You completed English Essay',
      detailedMessage: 'Great job! You have successfully completed your English Essay on climate change. The 500-word essay was submitted via the online portal. Your work has been marked as completed in the system.',
      type: 'success',
      timestamp: new Date('2024-01-14T16:30:00'),
      read: true,
      taskId: 4,
      subject: 'English',
      completedDate: '2024-01-14T16:00:00',
      actionRequired: false
    },
    {
      id: 3,
      title: 'New Task Added to Your Schedule',
      message: 'Biology Reading has been added to your calendar',
      detailedMessage: 'A new task "Biology Reading" has been scheduled for January 16th at 10:00 AM. You need to read chapter 5 on cell structure and create flashcards for key terms. Estimated time required: 90 minutes.',
      type: 'info',
      timestamp: new Date('2024-01-13T09:15:00'),
      read: false,
      taskId: 2,
      subject: 'Biology',
      dueDate: '2024-01-16T10:00:00',
      priority: 'medium',
      actionRequired: false,
      estimatedMinutes: 90
    },
    {
      id: 4,
      title: 'Task Overdue: Chemistry Lab Report',
      message: 'Chemistry Lab Report was due yesterday',
      detailedMessage: 'Your Chemistry Lab Report for the acid-base titration experiment was due on January 10th at 3:00 PM. The lab was completed successfully according to your notes. Please submit the report as soon as possible to avoid further penalties.',
      type: 'error',
      timestamp: new Date('2024-01-11T10:00:00'),
      read: true,
      taskId: 7,
      subject: 'Chemistry',
      dueDate: '2024-01-10T15:00:00',
      priority: 'medium',
      actionRequired: true,
      overdueDays: 1
    },
    {
      id: 5,
      title: 'Study Reminder: Math Problem Set',
      message: 'Don\'t forget to study for your Math Problem Set due tomorrow',
      detailedMessage: 'This is a friendly reminder that your Math Problem Set on Calculus derivatives practice is due tomorrow at 2:00 PM. You should work on problems 1-15 from the textbook. Estimated study time: 3 hours.',
      type: 'warning',
      timestamp: new Date('2024-01-19T18:00:00'),
      read: false,
      taskId: 3,
      subject: 'Mathematics',
      dueDate: '2024-01-20T14:00:00',
      priority: 'low',
      actionRequired: true,
      estimatedMinutes: 180
    },
    {
      id: 6,
      title: 'Task Deadline Extended',
      message: 'Programming Project deadline has been extended',
      detailedMessage: 'Good news! The deadline for your Programming Project (React todo application) has been extended. The new deadline is January 22nd at 11:59 PM. This gives you additional time to follow React best practices and complete the project thoroughly.',
      type: 'info',
      timestamp: new Date('2024-01-20T14:00:00'),
      read: true,
      taskId: 6,
      subject: 'Programming',
      dueDate: '2024-01-22T23:59:00',
      priority: 'high',
      actionRequired: false,
      estimatedMinutes: 300
    }
  ]

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setNotifications(mockNotifications)
    setLoading(false)
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
    if (selectedNotification?.id === id) {
      setSelectedNotification({ ...selectedNotification, read: true })
    }
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
    if (selectedNotification) {
      setSelectedNotification({ ...selectedNotification, read: true })
    }
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
    if (selectedNotification?.id === id) {
      setSelectedNotification(null)
    }
  }

  const clearAll = () => {
    setNotifications([])
    setSelectedNotification(null)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'info':
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'success':
        return 'border-green-200 bg-green-50'
      case 'info':
      default:
        return 'border-blue-200 bg-blue-50'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatDateTime = (timestamp) => {
    return timestamp.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read
    if (filter === 'read') return notification.read
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  // Detail View Component
  const NotificationDetail = () => {
    if (!selectedNotification) return null

    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedNotification(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                {getNotificationIcon(selectedNotification.type)}
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {selectedNotification.title}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDateTime(selectedNotification.timestamp)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!selectedNotification.read && (
                <button
                  onClick={() => markAsRead(selectedNotification.id)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <CheckIcon className="h-4 w-4" />
                  Mark Read
                </button>
              )}
              <button
                onClick={() => deleteNotification(selectedNotification.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Main Message */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Message</h3>
            <p className="text-gray-700 leading-relaxed">
              {selectedNotification.detailedMessage}
            </p>
          </div>

          {/* Task Details */}
          {selectedNotification.taskId && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedNotification.subject && (
                  <div className="flex items-center gap-3">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Subject</p>
                      <p className="font-medium text-gray-900">{selectedNotification.subject}</p>
                    </div>
                  </div>
                )}
                {selectedNotification.dueDate && (
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedNotification.dueDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {selectedNotification.priority && (
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(selectedNotification.priority)}`}></div>
                    <div>
                      <p className="text-sm text-gray-500">Priority</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedNotification.priority}</p>
                    </div>
                  </div>
                )}
                {selectedNotification.estimatedMinutes && (
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Estimated Time</p>
                      <p className="font-medium text-gray-900">
                        {Math.floor(selectedNotification.estimatedMinutes / 60)}h {selectedNotification.estimatedMinutes % 60}m
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Required */}
          {selectedNotification.actionRequired && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Action Required</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    This notification requires your attention. Please take appropriate action.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // List View Component
  const NotificationsList = () => (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {filteredNotifications.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notification.read ? 'bg-blue-50' : ''
              } ${getNotificationColor(notification.type)}`}
              onClick={() => {
                setSelectedNotification(notification)
                if (!notification.read) {
                  markAsRead(notification.id)
                }
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-sm font-semibold ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTime(notification.timestamp)}
                        </span>
                        {notification.subject && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {notification.subject}
                          </span>
                        )}
                        {!notification.read && (
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                          className="p-1 hover:bg-white rounded transition-colors"
                          title="Mark as read"
                        >
                          <CheckIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className="p-1 hover:bg-white rounded transition-colors"
                        title="Delete notification"
                      >
                        <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
          </h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? "You're all caught up! New notifications will appear here."
              : `You don't have any ${filter} notifications.`
            }
          </p>
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">Stay updated with your study schedule</p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Mark all as read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        {selectedNotification ? (
          <NotificationDetail />
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  {['all', 'unread', 'read'].map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                        filter === filterType
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {filterType}
                      {filterType === 'unread' && unreadCount > 0 && (
                        <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            <NotificationsList />

            {/* Quick Stats */}
            {notifications.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
                  <div className="text-sm text-gray-600">Unread</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{notifications.length - unreadCount}</div>
                  <div className="text-sm text-gray-600">Read</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}