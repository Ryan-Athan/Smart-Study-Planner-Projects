import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  Squares2X2Icon,
  ListBulletIcon,
  TableCellsIcon,
  XMarkIcon,
  AcademicCapIcon,
  TagIcon
} from '@heroicons/react/24/outline'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [viewMode, setViewMode] = useState('card')
  const [selectedTask, setSelectedTask] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Mock data
  const mockTasks = [
    {
      id: 1,
      title: 'Complete Physics homework',
      description: 'Finish chapters 5-7 and solve all problems. Focus on understanding the concepts rather than just completing the assignment.',
      subject: 'Physics',
      dueDate: '2024-01-15T18:00',
      priority: 'high',
      status: 'pending',
      estimatedMinutes: 120,
      progress: 60,
      createdAt: '2024-01-10T10:00:00',
      notes: 'Need to review chapter 6 before starting problems'
    },
    {
      id: 2,
      title: 'Read Chapter 5 - Biology',
      description: 'Cell structure and functions. Pay special attention to mitochondria and chloroplast functions.',
      subject: 'Biology',
      dueDate: '2024-01-16T10:00',
      priority: 'medium',
      status: 'pending',
      estimatedMinutes: 90,
      progress: 20,
      createdAt: '2024-01-11T14:30:00',
      notes: 'Create flashcards for key terms'
    },
    {
      id: 3,
      title: 'Math problem set',
      description: 'Calculus derivatives and integrals. Problems 1-15 from textbook.',
      subject: 'Mathematics',
      dueDate: '2024-01-20T14:00',
      priority: 'low',
      status: 'pending',
      estimatedMinutes: 180,
      progress: 0,
      createdAt: '2024-01-12T09:15:00',
      notes: ''
    },
    {
      id: 4,
      title: 'English essay writing',
      description: '500-word essay on climate change impacts and solutions.',
      subject: 'English',
      dueDate: '2024-01-14T16:00',
      priority: 'high',
      status: 'completed',
      estimatedMinutes: 120,
      progress: 100,
      createdAt: '2024-01-08T11:20:00',
      notes: 'Submitted via online portal'
    },
    {
      id: 5,
      title: 'History research paper',
      description: 'World War II causes and consequences. 1500 words with proper citations.',
      subject: 'History',
      dueDate: '2024-01-18T12:00',
      priority: 'medium',
      status: 'pending',
      estimatedMinutes: 240,
      progress: 30,
      createdAt: '2024-01-09T15:45:00',
      notes: 'Need to visit library for primary sources'
    },
    {
      id: 6,
      title: 'Programming project',
      description: 'Build a React todo application with CRUD operations and local storage.',
      subject: 'Programming',
      dueDate: '2024-01-22T23:59',
      priority: 'high',
      status: 'pending',
      estimatedMinutes: 300,
      progress: 45,
      createdAt: '2024-01-13T13:10:00',
      notes: 'Follow React best practices and use hooks'
    }
  ]

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    filterAndSortTasks()
  }, [tasks, searchTerm, filter, sortBy])

  const loadTasks = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setTasks(mockTasks)
    setLoading(false)
  }

  const filterAndSortTasks = () => {
    let filtered = [...tasks]

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filter !== 'all') {
      if (['pending', 'completed'].includes(filter)) {
        filtered = filtered.filter(task => task.status === filter)
      } else {
        filtered = filtered.filter(task => task.priority === filter)
      }
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate)
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredTasks(filtered)
  }

  const handleDeleteTask = async (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId))
    }
  }

  const handleToggleStatus = async (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ))
  }

  const handleViewTask = (task) => {
    setSelectedTask(task)
    setIsViewModalOpen(true)
  }

  const handleEditTask = (task) => {
    setSelectedTask(task)
    setIsEditModalOpen(true)
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
    setIsEditModalOpen(false)
    setSelectedTask(null)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    return status === 'completed' 
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
  }

  const ProgressBar = ({ progress, color = 'bg-blue-500' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color} transition-all duration-300`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )

  // View Task Modal
  const ViewTaskModal = () => {
    if (!selectedTask) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Task Details</h2>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{selectedTask.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTask.status)}`}>
                  {selectedTask.status}
                </span>
              </div>
              <p className="text-gray-600">{selectedTask.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <div className="flex items-center gap-2">
                    <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">{selectedTask.subject}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                    <span className={`${isOverdue(selectedTask.dueDate) && selectedTask.status !== 'completed' ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                      {formatDateTime(selectedTask.dueDate)}
                      {isOverdue(selectedTask.dueDate) && selectedTask.status !== 'completed' && ' (Overdue)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time</label>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900">
                      {Math.floor(selectedTask.estimatedMinutes / 60)}h {selectedTask.estimatedMinutes % 60}m
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                  <div className="space-y-2">
                    <ProgressBar 
                      progress={selectedTask.progress} 
                      color={selectedTask.priority === 'high' ? 'bg-red-500' : selectedTask.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                    />
                    <div className="text-sm text-gray-600">{selectedTask.progress}% complete</div>
                  </div>
                </div>
              </div>
            </div>

            {selectedTask.notes && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedTask.notes}</p>
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500">
              Created on {formatDateTime(selectedTask.createdAt)}
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={() => {
                setIsViewModalOpen(false)
                handleEditTask(selectedTask)
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Edit Task
            </button>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Edit Task Modal
  const EditTaskModal = () => {
    const [formData, setFormData] = useState(selectedTask || {})

    useEffect(() => {
      if (selectedTask) {
        setFormData(selectedTask)
      }
    }, [selectedTask])

    const handleSubmit = (e) => {
      e.preventDefault()
      handleUpdateTask(formData)
    }

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    if (!selectedTask) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Edit Task</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Programming">Programming</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date & Time</label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
                <input
                  type="number"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes || ''}
                onChange={handleChange}
                placeholder="Add any additional notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status === 'completed'}
                  onChange={(e) => setFormData({
                    ...formData,
                    status: e.target.checked ? 'completed' : 'pending'
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Mark as completed</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Action Buttons Component
  const ActionButtons = ({ task }) => (
    <div className="flex items-center gap-1">
      <button 
        onClick={() => handleViewTask(task)}
        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
        title="View Details"
      >
        <EyeIcon className="h-4 w-4" />
      </button>
      <button 
        onClick={() => handleEditTask(task)}
        className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
        title="Edit Task"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
      <button 
        onClick={() => handleDeleteTask(task.id)}
        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
        title="Delete Task"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  )

  // Card View Component
  const CardView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredTasks.map((task) => (
        <div key={task.id} className={`bg-white rounded-lg border-2 ${
          isOverdue(task.dueDate) && task.status !== 'completed' 
            ? 'border-red-300 bg-red-50' 
            : 'border-gray-200'
        } p-4 hover:shadow-md transition-all duration-200`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{task.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">{task.subject}</span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {Math.floor(task.estimatedMinutes / 60)}h {task.estimatedMinutes % 60}m
                </span>
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-between mb-3 p-2 rounded ${
            isOverdue(task.dueDate) && task.status !== 'completed' 
              ? 'bg-red-100 text-red-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm font-medium">
                {formatDate(task.dueDate)} at {formatTime(task.dueDate)}
              </span>
            </div>
            {isOverdue(task.dueDate) && task.status !== 'completed' && (
              <span className="text-xs font-bold">OVERDUE</span>
            )}
          </div>

          {task.status !== 'completed' && task.progress > 0 && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <ProgressBar 
                progress={task.progress} 
                color={task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleStatus(task.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                } transition-colors`}
              >
                <CheckCircleIcon className="h-4 w-4" />
                {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
            <ActionButtons task={task} />
          </div>
        </div>
      ))}
    </div>
  )

  // List View Component
  const ListView = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      {filteredTasks.map((task, index) => (
        <div key={task.id} className={`flex items-center justify-between p-4 ${
          index !== filteredTasks.length - 1 ? 'border-b border-gray-200' : ''
        } hover:bg-gray-50 transition-colors`}>
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => handleToggleStatus(task.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                task.status === 'completed'
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              } transition-colors`}
            >
              {task.status === 'completed' && <CheckCircleIcon className="h-3 w-3" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold ${
                  task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-gray-600 text-sm truncate">{task.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <span>{task.subject}</span>
                <span>•</span>
                <span>{Math.floor(task.estimatedMinutes / 60)}h {task.estimatedMinutes % 60}m</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className={`text-sm font-medium ${
                isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {formatDate(task.dueDate)}
              </div>
              <div className="text-xs text-gray-500">{formatTime(task.dueDate)}</div>
            </div>

            {task.status !== 'completed' && task.progress > 0 && (
              <div className="w-20">
                <ProgressBar 
                  progress={task.progress} 
                  color={task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                />
                <div className="text-xs text-gray-500 text-center mt-1">{task.progress}%</div>
              </div>
            )}

            <ActionButtons task={task} />
          </div>
        </div>
      ))}
    </div>
  )

  // Table View Component
  const TableView = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(task.id)}
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        task.status === 'completed'
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      } transition-colors`}
                    >
                      {task.status === 'completed' && <CheckCircleIcon className="h-3 w-3" />}
                    </button>
                    <div>
                      <div className={`font-medium ${
                        task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">{task.subject}</span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className={`text-sm ${
                  isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-red-600 font-medium' : 'text-gray-600'
                }`}>
                  {formatDate(task.dueDate)}
                </div>
                <div className="text-xs text-gray-500">{formatTime(task.dueDate)}</div>
              </td>
              <td className="px-6 py-4">
                {task.status !== 'completed' ? (
                  <div className="w-24">
                    <ProgressBar 
                      progress={task.progress} 
                      color={task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}
                    />
                    <div className="text-xs text-gray-500 text-center mt-1">{task.progress}%</div>
                  </div>
                ) : (
                  <span className="text-green-600 text-sm font-medium">Completed</span>
                )}
              </td>
              <td className="px-6 py-4">
                <ActionButtons task={task} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const TaskStats = () => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.status === 'completed').length
    const pendingTasks = totalTasks - completedTasks
    const overdueTasks = tasks.filter(task => isOverdue(task.dueDate) && task.status !== 'completed').length

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{pendingTasks}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
          <div className="text-sm text-gray-600">Overdue</div>
        </div>
      </div>
    )
  }

  const ViewModeToggle = () => (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode('card')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <Squares2X2Icon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <ListBulletIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setViewMode('table')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <TableCellsIcon className="h-5 w-5" />
      </button>
    </div>
  )

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-2">Manage and track your study tasks</p>
          </div>
          <Link href="/tasks/new">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <PlusIcon className="h-5 w-5" />
              Add Task
            </button>
          </Link>
        </div>

        {/* Task Statistics */}
        <TaskStats />

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <ViewModeToggle />

            {/* Filter and Sort */}
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks Display */}
        {filteredTasks.length > 0 ? (
          <>
            {viewMode === 'card' && <CardView />}
            {viewMode === 'list' && <ListView />}
            {viewMode === 'table' && <TableView />}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first task'
                }
              </p>
              <Link href="/tasks/new">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Create Your First Task
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Modals */}
        {isViewModalOpen && <ViewTaskModal />}
        {isEditModalOpen && <EditTaskModal />}
      </div>
    </Layout>
  )
}