import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { RequireAuth, RedirectIfAuth } from './components/RequireAuth';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';

function App() {
  // no auto guest login; use explicit auth pages

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<RedirectIfAuth><LoginPage /></RedirectIfAuth>} />
        <Route path="/signup" element={<RedirectIfAuth><SignupPage /></RedirectIfAuth>} />
        <Route path="/" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/project/:projectId" element={<RequireAuth><ProjectPage /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
