import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { 
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState({})

  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', met: false },
    { id: 2, text: 'One uppercase letter', met: false },
    { id: 3, text: 'One lowercase letter', met: false },
    { id: 4, text: 'One number', met: false },
    { id: 5, text: 'One special character', met: false }
  ]

  const checkPasswordStrength = (password) => {
    let strength = 0
    const requirements = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ]
    
    strength = requirements.filter(Boolean).length
    setPasswordStrength(strength)
    
    // Update requirements met status
    passwordRequirements.forEach((req, index) => {
      req.met = requirements[index]
    })
  }

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'bg-gray-200'
      case 1: return 'bg-red-500'
      case 2: return 'bg-orange-500'
      case 3: return 'bg-yellow-500'
      case 4: return 'bg-blue-500'
      case 5: return 'bg-green-500'
      default: return 'bg-gray-200'
    }
  }

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return 'Very Weak'
      case 1: return 'Very Weak'
      case 2: return 'Weak'
      case 3: return 'Fair'
      case 4: return 'Good'
      case 5: return 'Strong'
      default: return 'Very Weak'
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      // API call to update password would go here
      alert('Password updated successfully!')
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setPasswordStrength(0)
    } catch (error) {
      alert('Failed to update password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPasswordChange = (value) => {
    setFormData({ ...formData, newPassword: value })
    checkPasswordStrength(value)
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Update Password</h1>
                <p className="text-blue-100">Secure your account with a new password</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Security Tips */}
          <div className="lg:col-span-1 space-y-6">
            {/* Security Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                Security Tips
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Use a unique password that you don't use elsewhere</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Include numbers, symbols, and both uppercase and lowercase letters</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Avoid using personal information like your name or birthdate</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Consider using a password manager for better security</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Password Change</span>
                  <span className="text-sm font-medium text-gray-900">2 months ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Two-Factor Auth</span>
                  <span className="text-sm font-medium text-red-600">Not Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Security Score</span>
                  <span className="text-sm font-medium text-yellow-600">Medium</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Password Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <LockClosedIcon className="h-4 w-4" />
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                      className={`w-full bg-gray-50 border ${
                        errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                      } rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <LockClosedIcon className="h-4 w-4" />
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={(e) => handleNewPasswordChange(e.target.value)}
                        className={`w-full bg-gray-50 border ${
                          errors.newPassword ? 'border-red-300' : 'border-gray-300'
                        } rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        placeholder="Create a new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  {/* Password Strength Meter */}
                  {formData.newPassword && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Password Strength</span>
                        <span className={`text-sm font-semibold ${
                          passwordStrength <= 2 ? 'text-red-600' : 
                          passwordStrength <= 3 ? 'text-yellow-600' : 
                          'text-green-600'
                        }`}>
                          {getStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Password Requirements */}
                  {formData.newPassword && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Requirements:</p>
                      <div className="space-y-1">
                        {passwordRequirements.map((req) => (
                          <div key={req.id} className="flex items-center gap-2">
                            {req.met ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <LockClosedIcon className="h-4 w-4" />
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={`w-full bg-gray-50 border ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      } rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                  {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircleIcon className="h-4 w-4" />
                      Passwords match
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating Password...
                    </div>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}