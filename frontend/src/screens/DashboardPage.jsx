import React, { useEffect, useState } from 'react';
import config from '../constants.js';
import { PowerIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

const DashboardPage = ({ user, myLogs, onLogout, onLoadMyLogs, onCreateLog }) => {
  const [newLog, setNewLog] = useState({ title: '', details: '', subjectType: 'Chimp' });

  useEffect(() => {
    onLoadMyLogs();
  }, []);

  const handleCreateLog = async (e) => {
    e.preventDefault();
    if (!newLog.title || !newLog.details) {
      alert('Title and details are required.');
      return;
    }
    await onCreateLog({ ...newLog, observationDate: new Date().toISOString() });
    setNewLog({ title: '', details: '', subjectType: 'Chimp' });
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Scientist Dashboard</h1>
            <p className="text-indigo-300">Welcome, {user.role} {user.name}!</p>
          </div>
          <div className="flex items-center space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              Admin Panel
            </a>
            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              <PowerIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <PlusCircleIcon className="h-6 w-6 mr-2 text-indigo-400" />
                New Mission Log
              </h2>
              <form onSubmit={handleCreateLog} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="e.g., Chimp Behavior Study"
                    value={newLog.title}
                    onChange={(e) => setNewLog({...newLog, title: e.target.value})}
                    className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                 <div>
                  <label htmlFor="subjectType" className="block text-sm font-medium text-gray-300">Subject</label>
                  <select
                    id="subjectType"
                    value={newLog.subjectType}
                    onChange={(e) => setNewLog({...newLog, subjectType: e.target.value})}
                    className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Chimp</option>
                    <option>Mouse</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-300">Details</label>
                  <textarea
                    id="details"
                    placeholder="Describe your observation..."
                    value={newLog.details}
                    onChange={(e) => setNewLog({...newLog, details: e.target.value})}
                    className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    rows="4"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Log Observation
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
             <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">My Mission Logs</h2>
                {myLogs.length === 0 ? (
                  <p className="text-gray-400">You haven't logged any observations yet. Use the form to get started.</p>
                ) : (
                  <div className="space-y-4">
                    {myLogs.map(log => (
                      <div key={log.id} className="bg-gray-800 p-4 rounded-md border-l-4 border-indigo-500">
                        <h3 className="font-semibold text-white">{log.title}</h3>
                        <p className="text-gray-300 text-sm mt-1 line-clamp-2">{log.details}</p>
                        <p className="text-xs text-gray-400 mt-2">Subject: {log.subjectType} | Logged on: {new Date(log.observationDate).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
