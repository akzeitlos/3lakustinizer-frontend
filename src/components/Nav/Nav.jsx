import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/authContext.jsx';

export default function Nav() {
  const navigate = useNavigate();
  const { removeAuthToken } = useContext(AuthContext); // ⬅ logout-Funktion aus dem Kontext

  const handleLogout = () => {
    removeAuthToken(); // ⬅ Zentraler Logout (löscht Token + optional: Event dispatch)
    navigate('/login'); // Weiterleitung zur Login-Seite
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        {/* weitere Links */}
        <li>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
