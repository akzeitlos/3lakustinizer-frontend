import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext.jsx";
import NavItem from "@/components/Nav/NavItem/NavItem";

import Dashboard from "@/assets/icons/dashboard.svg?react";
import Projects from "@/assets/icons/projects.svg?react";
import Illness from "@/assets/icons/illness.svg?react";
import Vacation from "@/assets/icons/vacation.svg?react";
import Settings from "@/assets/icons/settings.svg?react";
import Logout from "@/assets/icons/logout.svg?react";
import Profile from "@/assets/icons/profile.svg?react";
import Chevron from "@/assets/icons/chevron.svg?react";

import "./SideNav.css";

import Logo from "@/assets/logo/logo.svg";
import LogoSmall from "@/assets/logo/logoSmall.svg";

export default function SideNav() {
  const navigate = useNavigate();
  const { removeAuthToken } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    removeAuthToken();
    navigate("/login");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`side-nav ${isCollapsed ? "collapsed" : ""}`}>
      <div className="nav-top">
        <div className="nav-logo">
          <img
            src={isCollapsed ? LogoSmall : Logo}
            alt="Logo"
            className="logo-image"
          />
        </div>
        <ul className="nav-links">
          <NavItem to="/" end Icon={Dashboard} label="Dashboard" isCollapsed={isCollapsed} />
          <NavItem to="/projects" Icon={Projects} label="Projekte" isCollapsed={isCollapsed} />
          <NavItem to="/illness" Icon={Illness} label="Krankmeldung" isCollapsed={isCollapsed} />
          <NavItem to="/vacation" Icon={Vacation} label="Urlaub" isCollapsed={isCollapsed} />
        </ul>
      </div>

      <div className="nav-bottom">
        <ul className="nav-links">
          <NavItem to="/settings" Icon={Settings} label="Settings" isCollapsed={isCollapsed} />
          <NavItem to="/profile" Icon={Profile} label="Profile" isCollapsed={isCollapsed} />
          <li className="logout-button">
            <button className="nav-link" onClick={handleLogout}>
              <Logout className="icon" />
              {!isCollapsed && <span className="link-text">Logout</span>}
            </button>
          </li>
        </ul>
      </div>

      <button
        className="collapse-toggle"
        onClick={toggleCollapse}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <Chevron
          alt="Toggle"
          className={`chevron-icon ${isCollapsed ? "" : "rotated"}`}
        />
      </button>
    </aside>
  );
}
