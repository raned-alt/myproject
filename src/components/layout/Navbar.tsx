import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu,
  Bell,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { mockNotifications } from '../../utils/mockData';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadNotifications = mockNotifications.filter(n => !n.read);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-dark-700 dark:bg-dark-900/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black/5 dark:bg-dark-800 dark:ring-white/10"
              >
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  <div className="mt-2 space-y-2">
                    {mockNotifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'rounded-lg p-3 text-sm',
                          notification.read
                            ? 'bg-gray-50 dark:bg-dark-700'
                            : 'bg-blue-50 dark:bg-blue-900/20'
                        )}
                      >
                        <p className="font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-800"
            >
              <div className="h-6 w-6 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">
                {user?.name}
              </span>
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5 dark:bg-dark-800 dark:ring-white/10"
              >
                <div className="p-2">
                  <button className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2 border-gray-200 dark:border-dark-600" />
                  <button
                    onClick={logout}
                    className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};