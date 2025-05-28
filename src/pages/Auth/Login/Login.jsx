import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Auth Hook für die API-Aufrufe
import useAuth from "@/hooks/useAuth.jsx";

// Logo-Import
import Logo from "@/assets/logo/logo.svg";

// Wiederverwendbare Komponenten
import Input from "@/components/FormElements/Input/Input.jsx";
import Button from "@/components/Button/Button.jsx";

// Stile für die Login-Seite und allgemeine Authentifizierungsseiten
import "./Login.css";
import "../Auth.css";

function Login() {
  const navigate = useNavigate();

  // Zugriff auf Login-Funktion und Fehlerstatus aus dem Auth-Hook
  const { login, error } = useAuth();

  // Lokaler State für das Formular (E-Mail/Username & Passwort)
  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" });

  // Wird beim Absenden des Formulars aufgerufen
  async function handleLogin(e) {
    e.preventDefault();

    // Versuche, den Benutzer einzuloggen
    const result = await login(formData);

    // Wenn erfolgreich, zur Startseite navigieren
    if (result.success) {
      navigate("/");
    }
  }

  // Aktualisiert den Formularstate bei Benutzereingaben
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="auth-container">
      {/* App-Logo */}
      <img className="logo" src={Logo} alt="Logo" />

      {/* Login-Formular */}
      <form className="auth-form" onSubmit={handleLogin}>
        <Input
          name="emailOrUsername"
          type="text"
          label="E-Mail oder Username"
          value={formData.emailOrUsername}
          onChange={handleInputChange}
          required
        />

        <Input
          name="password"
          type="password"
          label="Passwort"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        {/* Login-Button */}
        <Button type="submit" style="primary">Login</Button>

        {/* Link zur "Passwort vergessen"-Seite */}
        <Link to="/forgot-password" className="forgot-password-link">
          Passwort vergessen?
        </Link>

        {/* Fehleranzeige bei fehlgeschlagenem Login */}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
