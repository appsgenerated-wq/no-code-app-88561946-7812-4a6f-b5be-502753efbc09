import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [publicLogs, setPublicLogs] = useState([]);
  const [myLogs, setMyLogs] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful. Initializing app.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          setUser(null);
          setCurrentScreen('landing');
        }
        loadPublicLogs();
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
      }
    };
    initializeApp();
  }, []);

  const login = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check credentials.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  const loadPublicLogs = async () => {
    try {
      const response = await manifest.from('MissionLog').find({ 
        include: ['author'],
        sort: { createdAt: 'desc' },
        limit: 10
      });
      setPublicLogs(response.data);
    } catch (error) {
      console.error('Failed to load public logs:', error);
    }
  };

  const loadMyLogs = async () => {
    if (!user) return;
    try {
      const response = await manifest.from('MissionLog').find({ 
        filter: { authorId: user.id },
        sort: { createdAt: 'desc' }
      });
      setMyLogs(response.data);
    } catch (error) {
      console.error('Failed to load my logs:', error);
    }
  };

  const createLog = async (logData) => {
    try {
      const newLog = await manifest.from('MissionLog').create(logData);
      setMyLogs([newLog, ...myLogs]);
      // Refresh public logs as well
      loadPublicLogs();
    } catch (error) {
      console.error('Failed to create log:', error);
      alert('Could not create log. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs text-gray-300">{backendConnected ? 'System Online' : 'System Offline'}</span>
      </div>
      
      {currentScreen === 'landing' || !user ? (
        <LandingPage 
          onLogin={() => login('admin@manifest.build', 'admin')} 
          logs={publicLogs}
        />
      ) : (
        <DashboardPage 
          user={user} 
          myLogs={myLogs} 
          onLogout={logout} 
          onLoadMyLogs={loadMyLogs}
          onCreateLog={createLog}
        />
      )}
    </div>
  );
}

export default App;
