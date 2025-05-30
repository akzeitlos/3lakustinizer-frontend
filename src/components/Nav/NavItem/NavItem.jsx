import { NavLink } from "react-router-dom";
import "./NavItem.css";

// End ist für den Aktiv-Status
export default function NavItem({ to, end = false, Icon, label, isCollapsed }) {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        {Icon && <Icon className="icon" /> }
        {!isCollapsed && <span className="link-text">{label}</span>}
      </NavLink>
    </li>
  );
}
