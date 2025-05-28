import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Dashboard from '@/pages/Dashboard/Dashboard.jsx';
import Login from '@/pages/Login/Login';
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';


const RoutingController = ({ token, isAuthenticated }) => {
  let userRoles = [];

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRoles = decoded.roles || [];
    } catch (err) {
      console.error('Ungültiges Token:', err);
      token = null;
    }
  }

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          {userRoles.includes('backoffice') && (
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default RoutingController;
