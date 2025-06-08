import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  MessageSquare,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'assistant', 'cashier'] },
    { name: 'Products', href: '/products', icon: Package, roles: ['admin', 'assistant'] },
    { name: 'Sales', href: '/sales', icon: ShoppingCart, roles: ['admin', 'assistant', 'cashier'] },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp, roles: ['admin', 'assistant'] },
    { name: 'Users', href: '/users', icon: Users, roles: ['admin'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
    { name: 'Assistant', href: '/assistant', icon: MessageSquare, roles: ['admin', 'assistant', 'cashier'] },
  ];

  const filteredNavigation = navigation.filter(item =>
    user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl dark:bg-dark-900 lg:static lg:translate-x-0',
          'flex flex-col border-r border-gray-200 dark:border-dark-700'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-dark-700">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-primary-600 p-2">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Inventory
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => onClose()}
                className={cn(
                  'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-dark-800 dark:hover:text-white'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300'
                  )}
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* User info */}
        <div className="border-t border-gray-200 p-4 dark:border-dark-700">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};