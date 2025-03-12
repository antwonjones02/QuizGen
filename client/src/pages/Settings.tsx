import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserIcon,
  KeyIcon,
  Cog6ToothIcon,
  BellIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { RootState } from '../store';
import { setDarkMode } from '../store/slices/uiSlice';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [activeTab, setActiveTab] = useState('account');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Mock API key for UI development
  const mockApiKey = 'sk-1234567890abcdefghijklmnopqrstuvwxyz';
  
  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle account update logic
    alert('Account settings saved');
  };
  
  const handleSaveApiSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle API settings update logic
    alert('API settings saved');
  };
  
  const handleGenerateApiKey = () => {
    // Mock API key generation
    setApiKey(mockApiKey);
    setShowApiKey(true);
  };
  
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey || mockApiKey);
    alert('API key copied to clipboard');
  };
  
  const handleToggleDarkMode = () => {
    dispatch(setDarkMode(!darkMode));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Manage your account and application preferences.
          </p>
        </div>
      </div>
      
      <div className="card">
        <div className="sm:hidden">
          <select
            id="tabs"
            className="form-select w-full"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="account">Account</option>
            <option value="api">API</option>
            <option value="appearance">Appearance</option>
            <option value="notifications">Notifications</option>
            <option value="export">Export</option>
            <option value="privacy">Privacy</option>
          </select>
        </div>
        
        <div className="hidden sm:block border-b border-neutral-200 dark:border-neutral-700">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'account'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
              onClick={() => setActiveTab('account')}
            >
              <UserIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
              Account
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'api'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
              onClick={() => setActiveTab('api')}
            >
              <KeyIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
              API
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'appearance'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
              onClick={() => setActiveTab('appearance')}
            >
              <Cog6ToothIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
              Appearance
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <BellIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
              Notifications
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'export'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
              onClick={() => setActiveTab('export')}
            >
              <DocumentTextIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
              Export
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'privacy'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300'
              }`}
              onClick={() => setActiveTab('privacy')}
            >
              <ShieldCheckIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
              Privacy
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'account' && (
            <form onSubmit={handleSaveAccount}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Account Information</h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Update your account details and preferences.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="mt-1 form-input"
                    placeholder="Enter your current password"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="mt-1 form-input"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="mt-1 form-input"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn btn-outline mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
          
          {activeTab === 'api' && (
            <form onSubmit={handleSaveApiSettings}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">API Settings</h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Manage your API keys and integration settings.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="openaiApiKey" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    OpenAI API Key
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      id="openaiApiKey"
                      className="form-input flex-1 rounded-r-none"
                      value={apiKey || mockApiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your OpenAI API key"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-neutral-300 dark:border-neutral-600 rounded-r-md bg-neutral-50 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Your API key is required to use the OpenAI services for question generation.
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleGenerateApiKey}
                  >
                    Generate New Key
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={handleCopyApiKey}
                  >
                    Copy Key
                  </button>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn btn-outline mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Save API Settings
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
          
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Appearance Settings</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Customize the look and feel of the application.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Dark Mode</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Enable dark mode for a more comfortable viewing experience in low light.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      darkMode ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
                    }`}
                    role="switch"
                    aria-checked={darkMode}
                    onClick={handleToggleDarkMode}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        darkMode ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Compact Mode</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Reduce spacing and padding for a more compact interface.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-neutral-200 dark:bg-neutral-700"
                    role="switch"
                    aria-checked="false"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-0" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">High Contrast Mode</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Increase contrast for better accessibility.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-neutral-200 dark:bg-neutral-700"
                    role="switch"
                    aria-checked="false"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-0" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Notification Settings</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Manage how and when you receive notifications.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Email Notifications</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Receive notifications via email.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-600"
                    role="switch"
                    aria-checked="true"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Browser Notifications</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Receive notifications in your browser.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-neutral-200 dark:bg-neutral-700"
                    role="switch"
                    aria-checked="false"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-0" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Document Processing Notifications</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Get notified when document processing is complete.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-600"
                    role="switch"
                    aria-checked="true"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Quiz Generation Notifications</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Get notified when quiz generation is complete.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-600"
                    role="switch"
                    aria-checked="true"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Export Settings</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Configure default export formats and options.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="defaultExportFormat" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Default Export Format
                  </label>
                  <select
                    id="defaultExportFormat"
                    className="mt-1 form-select"
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">DOCX</option>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                    <option value="scorm">SCORM</option>
                    <option value="xapi">xAPI</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Include in Exports
                  </label>
                  <div className="mt-2 space-y-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                        Question explanations
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                        Source references
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                        Bloom's taxonomy levels
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                        Difficulty scores
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn btn-outline mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                    >
                      Save Export Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Privacy Settings</h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Manage your privacy and data settings.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Data Collection</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Allow anonymous usage data collection to improve the application.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-600"
                    role="switch"
                    aria-checked="true"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 dark:text-white">Content Sharing</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Allow your quizzes to be shared with other users.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-neutral-200 dark:bg-neutral-700"
                    role="switch"
                    aria-checked="false"
                  >
                    <span className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-0" />
                  </button>
                </div>
                
                <div className="pt-5">
                  <button
                    type="button"
                    className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                  >
                    Delete Account
                  </button>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    This will permanently delete your account and all associated data.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;