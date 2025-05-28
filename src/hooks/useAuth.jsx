import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/authContext.jsx";

function useAuth() {
  const { setAuthToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  async function login(formData) {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          emailOrUsername: formData.emailOrUsername,
          password: formData.password,
        }
      );

      const token = response.data.token;
      setAuthToken(token);

      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || "Login fehlgeschlagen";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }
  async function requestPasswordReset(email) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler beim Absenden");
      }

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  
  async function resetPassword(token, password, confirmPassword) {
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      setLoading(false);
      return { success: false };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!response.ok) throw new Error("Zurücksetzen fehlgeschlagen");

      return { success: true };
    } catch (err) {
      setError("Link ungültig oder abgelaufen.");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }

  return { login, requestPasswordReset, resetPassword, loading, error };
}

export default useAuth;
