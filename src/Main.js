
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  ArchiveIcon,
  ClipboardCheckIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt2Icon,
  XIcon,
  QrcodeIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
// Components
import Dashboard from './Dashboard'
import Items from './Items'
import Inventory from './Inventory'
import Reports from './Reports'
//

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Main(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState({
    dashboard:{
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: HomeIcon, 
      current: false,
      component: Dashboard,
    },
    items:{
      name: 'Items', 
      href: '/items', 
      icon: ArchiveIcon, 
      current: false,
      component: Items,
    },
    inventory:{
      name: 'Inventory', 
      href: '/inventory', 
      icon: ClipboardCheckIcon, 
      current: false,
      component: Inventory,
    },
    reports:{
      name: 'Reports', 
      href: '/reports', 
      icon: DocumentReportIcon, 
      current: false,
      component: Reports,
    },
  });
  const [currentItem, setCurrentItem] = useState(false);
  
  useEffect(() => {
    setNavigation({...navigation,
      [props.page]:{...navigation[props.page],current:true}})
      setCurrentItem(navigation[props.page])
  },[])
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-pr-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-0 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        {/* <span className="sr-only">Close sidebar</span>
                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-13 w-auto"
                      src="./white.svg"
                      alt="Workflow"
                    />
                  </div>
                  
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {Object.values(navigation).map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-pr-900 text-white'
                              : 'text-gray-300 hover:bg-pr-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-pr-800">
            <div className="flex items-center h-20 flex-shrink-0 px-4 bg-pr-900 text-center grid justify-items-center hover:object-scale-down object-contain ">
              <img
                className="object-contain h-12 w-auto "
                src="./white.svg"
                alt="Workflow"
              />
              {/* <div className='tracking-wide text-white font-semibold'>N E S T</div> */}
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {Object.values(navigation).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-pr-900 text-white' : 'text-pr-300 hover:bg-pr-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only ">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600 ">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none ">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-pr-400 placeholder-gray-500 focus:outline-none focus:placeholder-pr-900 focus:ring-0 focus:border-transparent sm:text-sm "
                      placeholder="Search Items"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
              <button
                  type="button"
                  className="mr-2 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-out hover:ease-in border-pr-100 border-2 hover:border-pr-500"
                >
                  <span className="sr-only">Search By QR</span>
                  <QrcodeIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-out hover:ease-in border-pr-100 border-2 hover:border-pr-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <main className="flex-1">
           {currentItem ? <currentItem.component /> : 'Loading...'}
          </main>
        </div>
      </div>
    </>
  )
}
