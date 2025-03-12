import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  PencilSquareIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  DocumentDuplicateIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Documents', value: '12', icon: DocumentTextIcon, color: 'bg-blue-100 text-blue-800' },
  { name: 'Quizzes Created', value: '24', icon: PencilSquareIcon, color: 'bg-purple-100 text-purple-800' },
  { name: 'Questions Generated', value: '342', icon: DocumentDuplicateIcon, color: 'bg-green-100 text-green-800' },
  { name: 'Avg. Complexity Score', value: '4.2', icon: ChartBarIcon, color: 'bg-amber-100 text-amber-800' },
];

const recentActivity = [
  { id: 1, action: 'Created quiz', subject: 'Introduction to Machine Learning', time: '2 hours ago' },
  { id: 2, action: 'Uploaded document', subject: 'Data Structures and Algorithms.pdf', time: '5 hours ago' },
  { id: 3, action: 'Generated questions', subject: 'Web Development Fundamentals', time: '1 day ago' },
  { id: 4, action: 'Edited quiz', subject: 'Python Programming Basics', time: '2 days ago' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Welcome to QuizGen. Here's an overview of your activity.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link
            to="/documents"
            className="btn btn-outline"
          >
            Upload Document
          </Link>
          <Link
            to="/create"
            className="btn btn-primary"
          >
            Create Quiz
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{stat.name}</p>
                <p className="mt-1 text-3xl font-semibold text-neutral-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card">
          <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="p-5">
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="py-3">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {activity.action}: <span className="font-semibold">{activity.subject}</span>
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{activity.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Link
                to="/activity"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                View all activity
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Quiz Performance</h2>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-center h-64 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-center">
                <ArrowTrendingUpIcon className="mx-auto h-12 w-12 text-neutral-400" aria-hidden="true" />
                <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">No data available</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Start creating quizzes to see performance metrics.
                </p>
                <div className="mt-6">
                  <Link
                    to="/create"
                    className="btn btn-primary"
                  >
                    Create Quiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;