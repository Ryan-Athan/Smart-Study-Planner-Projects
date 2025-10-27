import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Desktop Sidebar - Fixed and Narrower */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-56 lg:flex-col">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>

      {/* Main Content Area - Adjusted spacing */}
      <div className="flex flex-col flex-1 min-w-0 lg:ml-56">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />
        
        {/* Main Content - Better spacing */}
        <main className="flex-1">
          <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}