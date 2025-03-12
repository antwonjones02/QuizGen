import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  HomeIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  to: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', to: '/', icon: HomeIcon },
  { name: 'Documents', to: '/documents', icon: DocumentTextIcon },
  { name: 'Create Quiz', to: '/create', icon: PencilSquareIcon },
  { name: 'Analytics', to: '/analytics', icon: ChartBarIcon },
  { name: 'Settings', to: '/settings', icon: Cog6ToothIcon },
  { name: 'Help', to: '/help', icon: QuestionMarkCircleIcon },
];

const Sidebar: React.FC = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  if (!sidebarOpen) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-neutral-800 shadow-md transform transition-transform duration-300 md:translate-x-0 border-r border-neutral-200 dark:border-neutral-700">
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0 h-16 flex items-center px-4 border-b border-neutral-200 dark:border-neutral-700">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">QuizGen</span>
        </div>
        
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-700/50 dark:hover:text-white'
                  }`
                }
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-6 w-6"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="flex-shrink-0 p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                QuizGen v1.0
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                AI-Powered Quiz Creation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;