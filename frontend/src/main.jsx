import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Simulation from './pages/Simulation';
import Management from './pages/Management';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <BrowserRouter>
    <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
      <Link to='/' style={{ marginRight: 10 }}>Dashboard</Link>
      <Link to='/simulate' style={{ marginRight: 10 }}>Simulation</Link>
      <Link to='/manage'>Management</Link>
    </nav>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path='/simulate' element={<RequireAuth><Simulation /></RequireAuth>} />
      <Route path='/manage' element={<RequireAuth><Management /></RequireAuth>} />
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById('root')).render(<App />);
