import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({ setSidebarOpen }) {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Mock unread notifications count - you can replace this with real data
  const unreadNotificationsCount = 3

  const handleNotificationsClick = () => {
    router.push('/notifications')
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 items-center justify-end gap-x-4">
        {/* Right side icons */}
        <div className="flex items-center gap-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              type="button" 
              onClick={handleNotificationsClick}
              className="relative flex items-center justify-center rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white ring-2 ring-white">
                {unreadNotificationsCount}
              </span>
            )}
          </div>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center rounded-full bg-gray-100 p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:bg-gray-200">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="ml-2 text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-700">{user?.name?.split(' ')[0] || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
              <svg className="ml-2 h-4 w-4 text-gray-500 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100">
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                </div>
                
                {/* Menu items */}
                <div className="py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={classNames(
                          active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
                          'flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/notifications"
                        className={classNames(
                          active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
                          'flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        <BellIcon className="mr-3 h-5 w-5 text-gray-400" />
                        Notifications
                        {unreadNotificationsCount > 0 && (
                          <span className="ml-auto bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                            {unreadNotificationsCount}
                          </span>
                        )}
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile/password"
                        className={classNames(
                          active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
                          'flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Update Password
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                
                {/* Sign out */}
                <div className="border-t border-gray-100 py-2">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={classNames(
                          active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
                          'flex w-full items-center px-4 py-2 text-sm'
                        )}
                      >
                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}