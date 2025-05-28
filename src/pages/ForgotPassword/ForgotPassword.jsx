import { useState } from "react";
import Input from "@/components/FormElements/Input/Input.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import Button from "@/components/Button/Button.jsx";
import Logo from "@/assets/logo/logo.svg";
import "./ForgotPassword.css"; // optional

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { requestPasswordReset, error } = useAuth();
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await requestPasswordReset(email);
    if (result.success) {
      setMessage("Wenn ein Konto existiert, wurde eine E-Mail gesendet.");
    }
  }

  return (
    <div className="forgot-password-container">
      <img className="logo" src={Logo} alt="Logo" />
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <Input
          name="email"
          type="text"
          label="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
