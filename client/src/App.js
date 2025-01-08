// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Leaderboard from './pages/Leaderboard';
import InfluencerPage from './pages/InfluencerPage';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/influencer/:id" element={<InfluencerPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      
      </Routes>
    </Router>
  );
}

export default App;

