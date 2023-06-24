import React, { useEffect, useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import AdminPanel from '../AdminPanel/AdminPanel';
import AdminLogin from '../AdminPanel/AdminLogin';

const AdminApp = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the admin token exists in local storage
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    } else {
      // Redirect to the login page if not authenticated
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Clear the admin token from local storage and update the authentication state
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    // Redirect to the login page after logout
    navigate('/admin/login');
  };

  return (
    <div>
      {isAuthenticated ? (
         <AdminPanel onLogout={handleLogout} />
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
     
    </div>
  );
};

export default AdminApp;
