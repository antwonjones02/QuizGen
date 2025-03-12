import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Footer: React.FC = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  
  return (
    <footer className={`bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} QuizGen. All rights reserved.
        </div>
        <div className="mt-2 md:mt-0 flex space-x-4">
          <a
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;