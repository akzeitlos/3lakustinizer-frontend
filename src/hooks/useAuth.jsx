import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/authContext.jsx';


function useAuth() {
  const { setAuthToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(formData) {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
      });

      const token = response.data.token;
      setAuthToken(token);

      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Login fehlgeschlagen';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}

export default useAuth;
