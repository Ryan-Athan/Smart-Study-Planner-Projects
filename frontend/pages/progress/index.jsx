import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import {
  ChartBarIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'

export default function ViewProgress() {
  const [timeRange, setTimeRange] = useState('week') // week, month, semester

  // Mock data - replace with real data
  const studyData = {
    week: [
      { day: 'Mon', hours: 3.5, tasks: 8 },
      { day: 'Tue', hours: 4.2, tasks: 10 },
      { day: 'Wed', hours: 2.8, tasks: 6 },
      { day: 'Thu', hours: 5.1, tasks: 12 },
      { day: 'Fri', hours: 3.2, tasks: 7 },
      { day: 'Sat', hours: 1.5, tasks: 4 },
      { day: 'Sun', hours: 2.0, tasks: 5 }
    ],
    month: [
      { week: 'Week 1', hours: 18, tasks: 42 },
      { week: 'Week 2', hours: 22, tasks: 51 },
      { week: 'Week 3', hours: 15, tasks: 38 },
      { week: 'Week 4', hours: 20, tasks: 47 }
    ]
  }

  const subjectData = [
    { subject: 'Mathematics', hours: 28, completed: 15, color: '#3B82F6' },
    { subject: 'Science', hours: 22, completed: 12, color: '#10B981' },
    { subject: 'History', hours: 15, completed: 8, color: '#F59E0B' },
    { subject: 'English', hours: 18, completed: 10, color: '#8B5CF6' },
    { subject: 'Programming', hours: 25, completed: 14, color: '#EF4444' }
  ]

  const completionRate = 78 // Percentage
  const totalStudyHours = 108
  const completedTasks = 59
  const averageSession = 2.4 // hours

  const StatsCard = ({ title, value, description, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Study Progress</h1>
            <p className="text-gray-600 mt-2">Track your learning journey and achievements</p>
          </div>
          <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
            {['week', 'month', 'semester'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  timeRange === range
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Completion Rate"
            value={`${completionRate}%`}
            description="Tasks completed"
            icon={CheckCircleIcon}
            color="text-green-500"
          />
          <StatsCard
            title="Total Study Hours"
            value={`${totalStudyHours}h`}
            description="This semester"
            icon={ClockIcon}
            color="text-blue-500"
          />
          <StatsCard
            title="Tasks Completed"
            value={completedTasks}
            description="Great progress!"
            icon={AcademicCapIcon}
            color="text-purple-500"
          />
          <StatsCard
            title="Avg Session"
            value={`${averageSession}h`}
            description="Per study session"
            icon={ChartBarIcon}
            color="text-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Study Hours Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Hours</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyData[timeRange]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeRange === 'week' ? 'day' : 'week'} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ subject, hours }) => `${subject}: ${hours}h`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hours"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject Progress</h3>
          <div className="space-y-4">
            {subjectData.map((subject) => (
              <div key={subject.subject} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">{subject.subject}</p>
                    <p className="text-sm text-gray-500">{subject.completed} tasks completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{subject.hours}h</p>
                  <p className="text-sm text-gray-500">total study time</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Current Study Streak</h3>
              <p className="text-blue-100">You've studied for 12 days in a row! 🔥</p>
            </div>
            <div className="text-3xl font-bold">12 days</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}