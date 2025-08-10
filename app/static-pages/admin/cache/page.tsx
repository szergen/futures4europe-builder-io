'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@app/custom-hooks/AuthContext/AuthContext';
import Link from 'next/link';

const AdminCachePanel = () => {
  const router = useRouter();
  const { isLoggedIn, userDetails, loading: authLoading } = useAuth();
  const [isInvalidating, setIsInvalidating] = useState(false);
  const [isWarming, setIsWarming] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [activeTab, setActiveTab] = useState('cache');

  // Check if user is logged in and is an admin
  useEffect(() => {
    if (!authLoading) {
      if (!isLoggedIn) {
        // Redirect to login page if not logged in
        router.push('/login');
      } else if (!userDetails.isAdmin) {
        // Redirect to dashboard if logged in but not an admin
        router.push('/dashboard');
      }
    }
  }, [isLoggedIn, userDetails.isAdmin, authLoading, router]);

  const handleInvalidateCache = async () => {
    try {
      setIsInvalidating(true);
      setStatusMessage('Invalidating cache...');
      setMessageType('info');

      // Call local API endpoint
      const response = await fetch('/api/invalidate-cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: '*',
        }),
      });

      if (response.ok) {
        setStatusMessage('Cache successfully invalidated!');
        setMessageType('success');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to invalidate cache');
      }
    } catch (error) {
      console.error('Error invalidating cache:', error);
      setStatusMessage(`Error: ${error.message}`);
      setMessageType('error');
    } finally {
      setIsInvalidating(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 5000);
    }
  };

  const handleWarmCache = async () => {
    try {
      setIsWarming(true);
      setStatusMessage('Pre-warming cache...');
      setMessageType('info');

      // Call local API endpoint
      const response = await fetch('/api/warm-cache', {
        method: 'POST',
      });

      if (response.ok) {
        setStatusMessage('Cache successfully pre-warmed!');
        setMessageType('success');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to pre-warm cache');
      }
    } catch (error) {
      console.error('Error warming cache:', error);
      setStatusMessage(`Error: ${error.message}`);
      setMessageType('error');
    } finally {
      setIsWarming(false);
      // Clear message after 5 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 5000);
    }
  };

  // Loading state while checking auth
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Not logged in or not admin - render nothing as redirect will happen
  if (!isLoggedIn || !userDetails.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Atlassian-inspired */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-lg font-semibold text-gray-900">
                  Administration
                </h1>
              </div>
              <nav className="ml-6 flex space-x-4">
                <Link href="/static-pages/admin/infopage">
                  <button
                    onClick={() => setActiveTab('infopage')}
                    className={`${
                      activeTab === 'infopage'
                        ? 'px-4 py-2 bg-blue-600 text-white rounded-md'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } px-1 pt-1 border-b-2 font-medium text-sm`}
                  >
                    Person Info Labeler
                  </button>
                </Link>

                {/* Add more tabs here as needed */}
                <Link href="/static-pages/admin/cache">
                  <button
                    onClick={() => setActiveTab('cache')}
                    className={`${
                      activeTab === 'cache'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } px-1 pt-1 border-b-2 font-medium text-sm`}
                  >
                    Cache Management
                  </button>
                </Link>

                {/* Add more tabs here as needed */}
                <Link href="/static-pages/admin">
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`${
                      activeTab === 'admin'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } px-1 pt-1 border-b-2 font-medium text-sm`}
                  >
                    Dashboard
                  </button>
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {userDetails?.email || 'Admin'}
              </span>
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Status message - Atlassian style */}
          {statusMessage && (
            <div
              className={`mb-6 p-4 rounded-md ${
                messageType === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : messageType === 'error'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  {messageType === 'success' ? (
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : messageType === 'error' ? (
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      messageType === 'success'
                        ? 'text-green-800'
                        : messageType === 'error'
                        ? 'text-red-800'
                        : 'text-blue-800'
                    }`}
                  >
                    {statusMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cache management section */}
          {activeTab === 'cache' && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Cache Management
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Optimize site performance by managing the cache.
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6 space-y-6">
                {/* Cache invalidation card - Supabase/Atlassian style */}
                <div className="bg-white border border-gray-200 rounded-lg px-6 py-5 shadow-sm">
                  <div className="flex justify-between">
                    <div className="max-w-xl">
                      <h4 className="text-base font-medium text-gray-900">
                        Invalidate Cache
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        Clear the site cache to force fresh content to be
                        served. This will remove all cached data and may
                        temporarily slow down the site until the cache is
                        rebuilt.
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={handleInvalidateCache}
                        disabled={isInvalidating}
                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                          ${
                            isInvalidating
                              ? 'bg-blue-300 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                          }`}
                      >
                        {isInvalidating ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Clearing...
                          </>
                        ) : (
                          'Clear Cache'
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cache pre-warming card - Supabase/Atlassian style */}
                <div className="bg-white border border-gray-200 rounded-lg px-6 py-5 shadow-sm">
                  <div className="flex justify-between">
                    <div className="max-w-xl">
                      <h4 className="text-base font-medium text-gray-900">
                        Pre-Warm Cache
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        Initialize the cache with fresh data to improve site
                        performance. This process will generate cache entries
                        for commonly accessed pages and data.
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={handleWarmCache}
                        disabled={isWarming}
                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                          ${
                            isWarming
                              ? 'bg-green-300 cursor-not-allowed'
                              : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                          }`}
                      >
                        {isWarming ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Warming...
                          </>
                        ) : (
                          'Warm Cache'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer - Atlassian style */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Futures4Europe Admin
            </p>
            <p className="text-sm text-gray-500">
              <span className="inline-flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                All systems operational
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminCachePanel;
