import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // navigate hinzufügen
import Input from "@/components/FormElements/Input/Input.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import Button from "@/components/Button/Button.jsx";
import Logo from "@/assets/logo/logo.svg";
import "./ResetPassword.css";
import "../Auth.css";


function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState(""); // confirm fehlt
  const { resetPassword, error } = useAuth();
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    // resetPassword erwartet token, password, confirmPassword
    const result = await resetPassword(token, password, confirm);

    if (result.success) {
      setMessage("Passwort wurde erfolgreich zurückgesetzt.");
      setTimeout(() => navigate("/login"), 2000);
    }
  }

  return (
    <div className="auth-container">
      <img className="logo" src={Logo} alt="Logo" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          name="password"
          type="password"
          label="Neues Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          name="confirm"
          type="password"
          label="Passwort bestätigen"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit" style="primary">
          Passwort zurücksetzen
        </Button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ResetPassword;
