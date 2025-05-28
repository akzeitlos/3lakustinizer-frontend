import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@/context/authContext.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import Logo from "@/assets/logo/logo.svg";
import "./Login.css";
import Input from "@/components/FormElements/Input/Input.jsx";
import Button from "@/components/Button/Button.jsx";

function Login() {
  const navigate = useNavigate();
  const { setAuthToken } = useContext(AuthContext);
  const { login, error } = useAuth();

  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" });

  async function handleLogin(e) {
    e.preventDefault();

    const result = await login(formData);

    if (result.success) {
      setAuthToken(result.data.token);
      navigate("/");
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login-container">
      <img className="logo" src={Logo} alt="Logo" />
      <form className="login-form" onSubmit={handleLogin}>
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
        <Button type="submit" style="primary">Login</Button>
          <Link to="/forgot-password" className="forgot-password-link">
            Passwort vergessen?
          </Link>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
