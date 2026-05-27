import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import {
  Menu as MenuIcon,
  X,
  UserCircle,
  Compass,
  LayoutGrid,
  LogOut
} from 'lucide-react';
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
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { name: 'Destinations', href: '/destinations', icon: Compass },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-blue-600/10 p-1.5 rounded-lg border border-blue-200/50 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
                <Compass className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                TravelPlanner
              </span>
            </Link>

            {isAuthenticated && (
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                      ? 'bg-blue-50/80 text-blue-600 border border-blue-100/50'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50/50'
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
                <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-white/50 border border-white/60 shadow-sm p-1">
                  <UserCircle className="h-8 w-8 text-gray-400 hover:text-blue-600 transition-colors" strokeWidth={1.5} />
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl py-1 glass-modal focus:outline-none overflow-hidden">
                    <Menu.Item>
                      <Link to="/profile" className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors">
                        <UserCircle className="h-4 w-4" /> Profil Saya
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Keluar
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-600 hover:bg-gray-50/50 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isAuthenticated && (
        <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-lg`}>
          <div className="pt-2 pb-3 space-y-1 px-4">
            <div className="px-3 py-3 text-sm text-gray-500 border-b border-gray-100 mb-2 flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Masuk sebagai <strong className="text-gray-900">{user?.nama || 'User'}</strong>
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${isActive(item.href) ? 'bg-blue-50 text-blue-600 border border-blue-100/50' : 'text-gray-500 hover:bg-gray-50/50 hover:text-gray-900'
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
                className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50/80"
              >
                <LogOut className="h-5 w-5" />
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