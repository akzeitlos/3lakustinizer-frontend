import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  function setAuthToken(tokenFromApi) {
    localStorage.setItem('token', tokenFromApi);
    setToken(tokenFromApi);
  }

  function removeAuthToken() {
    localStorage.removeItem('token');
    setToken(null);
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, setAuthToken, removeAuthToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
