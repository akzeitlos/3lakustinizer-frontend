import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext.jsx";
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Wenn kein Token vorhanden ist → Umleitung zum Login
    return <Navigate to="/login" replace />;
  }

  // Wenn Token vorhanden → geschützte Seite anzeigen
  return children;
};

export default ProtectedRoute;
