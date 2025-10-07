import React from 'react';
import config from '../constants.js';
import { CubeTransparentIcon, BeakerIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin, logs }) => {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Lunar Life</span>{' '}
                <span className="block text-indigo-400 xl:inline">Logger</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Tracking the extraordinary lives of chimps and mice on the lunar surface. Join the mission, log your findings, and contribute to science.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onLogin}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Login as Demo Scientist
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href={`${config.BACKEND_URL}/admin`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-500 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Admin Panel
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Moon surface" />
      </div>
      
      <div className="bg-gray-800 py-12 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-white text-center mb-8">Latest Mission Logs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {logs && logs.length > 0 ? logs.map(log => (
                      <div key={log.id} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-shadow duration-300">
                          <h3 className="text-xl font-bold text-indigo-400">{log.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">Subject: {log.subjectType}</p>
                          <p className="text-gray-300 mt-4 line-clamp-3">{log.details}</p>
                          <p className="text-xs text-gray-500 mt-4">Logged by {log.author?.name || 'a scientist'} on {new Date(log.createdAt).toLocaleDateString()}</p>
                      </div>
                  )) : (
                      <p className="text-gray-400 col-span-full text-center">No mission logs yet. The mission is just beginning!</p>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
