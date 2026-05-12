import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  MapIcon,
  Squares2X2Icon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Sembunyikan navbar di halaman landing, login, register
  const hiddenPaths = ['/', '/login', '/register'];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon },
    { name: 'Destinations', href: '/destinations', icon: MapIcon },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <MapIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                TripPlan.io
              </span>
            </Link>

            {isAuthenticated && (
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Auth / Profile */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <Menu as="div" className="ml-3 relative flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Halo, {user?.nama || 'User'}!</span>
                <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <UserCircleIcon className="h-8 w-8 text-gray-400 hover:text-blue-600 transition-colors" />
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <button 
                        onClick={logout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" /> Keluar
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : null}
          </div>

          {/* Mobile menu button */}
          {isAuthenticated && (
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
              >
                {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isAuthenticated && (
        <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden bg-white border-t border-gray-50`}>
          <div className="pt-2 pb-3 space-y-1 px-4">
            <div className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100 mb-2">
              Masuk sebagai <strong>{user?.nama || 'User'}</strong>
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-2 pt-2">
              <button 
                onClick={() => { setIsOpen(false); logout(); }}
                className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;