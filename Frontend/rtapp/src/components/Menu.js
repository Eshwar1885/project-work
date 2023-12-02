import { NavLink, useLocation } from "react-router-dom";
import './Menu.css'; // Import the CSS file

function Menu() {
  const location = useLocation();

  return (
    <div className="header">
      <div className="center-container">
        <div className="nav-links">
          <NavLink to="/" className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`}>Login</NavLink>
          <NavLink to="/signup" className={`nav-link ${location.pathname === "/signup" ? "active-link" : ""}`}>Register</NavLink>
          <NavLink to="/add-profile" className={`nav-link ${location.pathname === "/add-profile" ? "active-link" : ""}`}>Add Profile</NavLink>
          <NavLink to="/user-profile" className={`nav-link ${location.pathname === "/user-profile" ? "active-link" : ""}`}>User Profile</NavLink>
          <NavLink to="/user-profiles" className={`nav-link ${location.pathname === "/user-profiles" ? "active-link" : ""}`}>User Profiles</NavLink>
          <NavLink to="/add-request" className={`nav-link ${location.pathname === "/add-request" ? "active-link" : ""}`}>Add Request</NavLink>
          <NavLink to="/requests" className={`nav-link ${location.pathname === "/requests" ? "active-link" : ""}`}>Requests</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Menu;