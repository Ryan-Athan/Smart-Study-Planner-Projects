import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../contexts/AuthContext'
import { 
  UserIcon,
  EnvelopeIcon,
  PencilIcon,
  CameraIcon,
  CheckBadgeIcon,
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || 'Student focused on academic excellence and personal growth.',
    course: user?.course || 'Computer Science',
    year: user?.year || '3rd Year'
  })

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile:', formData)
    setIsEditing(false)
    // Add your update logic here
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || 'Student focused on academic excellence and personal growth.',
      course: user?.course || 'Computer Science',
      year: user?.year || '3rd Year'
    })
    setIsEditing(false)
  }

  const stats = [
    { label: 'Tasks Completed', value: '47', color: 'text-green-600' },
    { label: 'Current Tasks', value: '12', color: 'text-blue-600' },
    { label: 'Study Hours', value: '156', color: 'text-purple-600' },
    { label: 'Subjects', value: '8', color: 'text-orange-600' }
  ]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                <p className="text-blue-100">Manage your personal information and preferences</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
              >
                <PencilIcon className="h-5 w-5" />
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200 border-2 border-white">
                      <CameraIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    user?.name || 'Your Name'
                  )}
                </h2>
                <div className="flex items-center justify-center gap-1 text-blue-600 mb-4">
                  <CheckBadgeIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Verified Student</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows="3"
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    formData.bio
                  )}
                </p>
              </div>

              {/* Stats */}
              <div className="border-t border-gray-100 px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a 
                  href="/profile/password"
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <ShieldCheckIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">Update Password</span>
                </a>
                <a 
                  href="/notifications"
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                  <span className="text-gray-700 group-hover:text-purple-600 font-medium">Notification Settings</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Member since Jan 2024</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <UserIcon className="h-4 w-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border border-transparent">
                      {user?.name || 'Not set'}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <EnvelopeIcon className="h-4 w-4" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border border-transparent">
                      {user?.email || 'Not set'}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <UserIcon className="h-4 w-4" />
                    Course/Program
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border border-transparent">
                      {formData.course}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="h-4 w-4" />
                    Academic Year
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border border-transparent">
                      {formData.year}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Me
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows="4"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border border-transparent min-h-[120px]">
                    {formData.bio}
                  </div>
                )}
              </div>

              {/* Save/Cancel Buttons */}
              {isEditing && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Study Preferences */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Study Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Preferred Study Times</h4>
                  <div className="space-y-2">
                    {['Morning (6AM - 12PM)', 'Afternoon (12PM - 6PM)', 'Evening (6PM - 12AM)', 'Night (12AM - 6AM)'].map((time) => (
                      <label key={time} className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Study Reminders</h4>
                  <div className="space-y-2">
                    {['15 minutes before', '30 minutes before', '1 hour before', '2 hours before'].map((reminder) => (
                      <label key={reminder} className="flex items-center gap-3">
                        <input type="radio" name="reminder" className="text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">{reminder}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}