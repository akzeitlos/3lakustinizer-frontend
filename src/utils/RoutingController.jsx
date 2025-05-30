import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Dashboard from "@/pages/Dashboard/Dashboard.jsx";
import Login from "@/pages/Auth/Login/Login";
import ForgotPassword from "@/pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword/ResetPassword";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout/AuthLayout.jsx";

const RoutingController = ({ token, isAuthenticated }) => {
  let userRoles = [];

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRoles = decoded.roles || [];
    } catch (err) {
      console.error("Ungültiges Token:", err);
    }
  }

  // Auth-Routen zentral verwaltet
  const authRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
  ];

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {userRoles.includes("backoffice") && (
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          {authRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<AuthLayout>{element}</AuthLayout>}
            />
          ))}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default RoutingController;
