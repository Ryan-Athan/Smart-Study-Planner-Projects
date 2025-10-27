import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon,
  HomeIcon,
  ChartBarIcon, 
  CalendarIcon,
  BellIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Tasks', href: '/tasks', icon: ChartBarIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Profile', href: '/profile', icon: CogIcon },
]

export default function Sidebar({ open, setOpen }) {
  const router = useRouter()

  const SidebarContent = () => (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-4 pb-4">
      {/* Logo - Compact */}
      <div className="flex h-16 shrink-0 items-center px-2">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900 hidden lg:block">Study Planner</h1>
        </div>
      </div>

      {/* Navigation - Compact */}
      <nav className="flex flex-1 flex-col px-2">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          <li>
            <ul role="list" className="space-y-1">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex gap-x-3 rounded-lg p-2 text-sm font-medium leading-6 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      } transition-colors duration-200`}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="hidden lg:block">{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-blue-600 hidden lg:block"></div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <SidebarContent />
                <div className="absolute right-0 top-0 flex w-16 justify-center pt-5">
                  <button type="button" className="-m-2.5 p-2.5" onClick={() => setOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar - Narrower */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-56 lg:flex-col">
        <SidebarContent />
      </div>
    </>
  )
}