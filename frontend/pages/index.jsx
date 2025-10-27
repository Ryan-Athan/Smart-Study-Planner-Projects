import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Study Planner
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Organize your study schedule, track your progress, and achieve academic success with our intelligent study planner.
          </p>
          <div className="space-x-4">
            <Link href="/auth/login" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200">
              Get Started
            </Link>
            <Link href="/auth/signup" className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition duration-200">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}