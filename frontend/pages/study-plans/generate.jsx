import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { 
  AcademicCapIcon,
  ClockIcon,
  CalendarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function GeneratePlan() {
  const [formData, setFormData] = useState({
    subjects: [],
    availableHours: 20,
    studyDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    examDate: '',
    priority: 'balanced'
  })
  const [generatedPlan, setGeneratedPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const subjects = [
    { id: 'math', name: 'Mathematics', difficulty: 'high' },
    { id: 'science', name: 'Science', difficulty: 'medium' },
    { id: 'history', name: 'History', difficulty: 'low' },
    { id: 'english', name: 'English', difficulty: 'medium' },
    { id: 'programming', name: 'Programming', difficulty: 'high' },
    { id: 'physics', name: 'Physics', difficulty: 'high' }
  ]

  const handleSubjectToggle = (subjectId) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter(id => id !== subjectId)
        : [...prev.subjects, subjectId]
    }))
  }

  const handleGeneratePlan = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate AI plan generation
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock generated plan
    setGeneratedPlan({
      weeklySchedule: [
        { day: 'Monday', subjects: ['Mathematics', 'Science'], hours: 4 },
        { day: 'Tuesday', subjects: ['Programming', 'English'], hours: 3 },
        { day: 'Wednesday', subjects: ['Mathematics', 'Physics'], hours: 4 },
        { day: 'Thursday', subjects: ['Science', 'History'], hours: 3 },
        { day: 'Friday', subjects: ['Review All'], hours: 2 }
      ],
      focusAreas: ['Mathematics', 'Programming'],
      totalWeeklyHours: 16,
      recommendations: [
        'Focus on Mathematics in the morning when you are most alert',
        'Take 10-minute breaks every 50 minutes of study',
        'Review all subjects on Friday to reinforce learning'
      ]
    })
    
    setLoading(false)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <SparklesIcon className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">Generate Study Plan</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Let AI create a personalized study schedule based on your needs
          </p>
        </div>

        {!generatedPlan ? (
          /* Plan Generation Form */
          <form onSubmit={handleGeneratePlan} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-8">
              {/* Subjects Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  Select Subjects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subjects.map((subject) => (
                    <label
                      key={subject.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.subjects.includes(subject.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject.id)}
                        onChange={() => handleSubjectToggle(subject.id)}
                        className="hidden"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          subject.difficulty === 'high' ? 'bg-red-500' :
                          subject.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <span className="font-medium text-gray-900">{subject.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Available Time */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Available Study Time
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekly Study Hours: {formData.availableHours} hours
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      step="5"
                      value={formData.availableHours}
                      onChange={(e) => setFormData({...formData, availableHours: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>5h</span>
                      <span>40h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Days */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Study Days
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'monday', name: 'Monday' },
                    { id: 'tuesday', name: 'Tuesday' },
                    { id: 'wednesday', name: 'Wednesday' },
                    { id: 'thursday', name: 'Thursday' },
                    { id: 'friday', name: 'Friday' },
                    { id: 'saturday', name: 'Saturday' },
                    { id: 'sunday', name: 'Sunday' }
                  ].map((day) => (
                    <label
                      key={day.id}
                      className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.studyDays.includes(day.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.studyDays.includes(day.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, studyDays: [...formData.studyDays, day.id]})
                          } else {
                            setFormData({...formData, studyDays: formData.studyDays.filter(d => d !== day.id)})
                          }
                        }}
                        className="hidden"
                      />
                      <span className="font-medium text-gray-900">{day.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={loading || formData.subjects.length === 0}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Generating Your Plan...
                  </div>
                ) : (
                  'Generate Smart Study Plan'
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Generated Plan Display */
          <div className="space-y-6">
            {/* Plan Overview */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Your Personalized Study Plan</h2>
              <p className="text-blue-100">AI-generated schedule optimized for your learning style</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{generatedPlan.totalWeeklyHours}h</div>
                  <div className="text-blue-100 text-sm">Weekly Study</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{formData.subjects.length}</div>
                  <div className="text-blue-100 text-sm">Subjects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{formData.studyDays.length}</div>
                  <div className="text-blue-100 text-sm">Study Days</div>
                </div>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
              <div className="space-y-4">
                {generatedPlan.weeklySchedule.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{day.day}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {day.subjects.join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{day.hours}h</div>
                      <div className="text-sm text-gray-500">study time</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Areas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Focus Areas</h3>
              <div className="flex flex-wrap gap-2">
                {generatedPlan.focusAreas.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {generatedPlan.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <SparklesIcon className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setGeneratedPlan(null)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Generate New Plan
              </button>
              <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Save This Plan
              </button>
              <button className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Add to Calendar
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}