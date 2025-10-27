import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  AcademicCapIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    upcomingDeadlines: 0,
    studyTime: 0
  })
  
  const [recentActivity, setRecentActivity] = useState([])
  const [upcomingTasks, setUpcomingTasks] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    // Mock data - replace with API calls
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    // Simulate API loading
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setStats({
      totalTasks: 12,
      completedTasks: 8,
      upcomingDeadlines: 3,
      studyTime: 24
    })

    setRecentActivity([
      {
        id: 1,
        type: 'completed',
        message: 'Completed Math assignment',
        time: '2 hours ago',
        subject: 'Mathematics',
        icon: CheckCircleIcon,
        color: 'text-green-500'
      },
      {
        id: 2,
        type: 'created',
        message: 'Added new Science task',
        time: '4 hours ago',
        subject: 'Science',
        icon: ClockIcon,
        color: 'text-blue-500'
      },
      {
        id: 3,
        type: 'reminder',
        message: 'History exam in 3 days',
        time: '1 day ago',
        subject: 'History',
        icon: AcademicCapIcon,
        color: 'text-orange-500'
      }
    ])

    setUpcomingTasks([
      {
        id: 1,
        title: 'Complete Physics homework',
        subject: 'Physics',
        dueDate: 'Today, 6:00 PM',
        priority: 'high',
        progress: 60
      },
      {
        id: 2,
        title: 'Read Chapter 5 - Biology',
        subject: 'Biology',
        dueDate: 'Tomorrow, 10:00 AM',
        priority: 'medium',
        progress: 20
      },
      {
        id: 3,
        title: 'Math problem set',
        subject: 'Mathematics',
        dueDate: 'Dec 15, 2:00 PM',
        priority: 'low',
        progress: 0
      }
    ])
  }

  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )

  const ProgressBar = ({ progress, color = 'bg-blue-500' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color} transition-all duration-300`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )

  const PriorityBadge = ({ priority }) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority]}`}>
        {priority}
      </span>
    )
  }

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Welcome back, {user?.name || 'Student'}! 👋
              </h1>
              <p className="text-blue-100 mt-1 text-sm sm:text-base">
                Here's your study overview for today. Keep up the great work!
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="bg-white bg-opacity-20 rounded-lg p-2">
                <ChartBarIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            icon={AcademicCapIcon}
            color="text-blue-500"
            description="All active tasks"
          />
          <StatCard
            title="Completed"
            value={stats.completedTasks}
            icon={CheckCircleIcon}
            color="text-green-500"
            description="Great progress!"
          />
          <StatCard
            title="Upcoming"
            value={stats.upcomingDeadlines}
            icon={ClockIcon}
            color="text-orange-500"
            description="Deadlines this week"
          />
          <StatCard
            title="Study Hours"
            value={`${stats.studyTime}h`}
            icon={ChartBarIcon}
            color="text-purple-500"
            description="This week"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {upcomingTasks.length} tasks
              </span>
            </div>
            
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="group p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {task.title}
                        </h3>
                        <PriorityBadge priority={task.priority} />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{task.subject}</span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {task.progress > 0 && (
                    <div className="mt-3">
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
                </div>
              ))}
              
              {upcomingTasks.length === 0 && (
                <div className="text-center py-8">
                  <AcademicCapIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No upcoming tasks</p>
                  <Link href="/tasks/new">
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      + Add your first task
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <span className="text-sm text-gray-500">{recentActivity.length} activities</span>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {activity.subject}
                      </span>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {recentActivity.length === 0 && (
                <div className="text-center py-8">
                  <ChartBarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/tasks/new">
              <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group w-full">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200">
                  <span className="text-blue-600 font-bold">+</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Add Task</span>
              </button>
            </Link>
            
            <Link href="/study-now">
              <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-green-400 hover:bg-green-50 transition-all duration-200 group w-full">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200">
                  <ClockIcon className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Study Now</span>
              </button>
            </Link>
            
            <Link href="/progress">
              <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group w-full">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200">
                  <ChartBarIcon className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">View Progress</span>
              </button>
            </Link>
            
            <Link href="/study-plans/generate">
              <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 group w-full">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-orange-200">
                  <AcademicCapIcon className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Generate Plan</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Tip of the Day</h3>
              <p className="text-gray-700">
                Try the Pomodoro technique: Study for 25 minutes, then take a 5-minute break. 
                After four sessions, take a longer 15-30 minute break. This helps maintain focus and prevent burnout.
              </p>
              <Link href="/study-now">
                <button className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Try Pomodoro Timer →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}