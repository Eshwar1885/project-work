import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Menu.css'; // Import the CSS file

function Menu() {
  const location = useLocation();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="header">
      <div className="center-container">
        <div className="nav-links">
          <NavLink to="/" className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`}>
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={`nav-link ${location.pathname === '/signup' ? 'active-link' : ''}`}
          >
            Register
          </NavLink>

          {/* Profile Dropdown */}
          <div className="profile-dropdown">
            <div
              className={`nav-link ${isProfileDropdownOpen ? 'active-link' : ''}`}
              onClick={toggleProfileDropdown}
            >
              Profiles
            </div>
            {isProfileDropdownOpen && (
              <div className="dropdown-content">
                <NavLink
                  to="/add-profile"
                  className={`nav-link ${location.pathname === '/add-profile' ? 'active-link' : ''}`}
                >
                  Add Profile
                </NavLink>
                <NavLink
                  to="/user-profile"
                  className={`nav-link ${location.pathname === '/user-profile' ? 'active-link' : ''}`}
                >
                  User Profile
                </NavLink>
                <NavLink
                  to="/user-profiles"
                  className={`nav-link ${location.pathname === '/user-profiles' ? 'active-link' : ''}`}
                >
                  User Profiles
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/add-request"
            className={`nav-link ${location.pathname === '/add-request' ? 'active-link' : ''}`}
          >
            Add Request
          </NavLink>
          <NavLink to="/requests" className={`nav-link ${location.pathname === '/requests' ? 'active-link' : ''}`}>
            Requests
          </NavLink>
          <NavLink
            to="/AddPayment"
            className={`nav-link ${location.pathname === '/AddPayment' ? 'active-link' : ''}`}
          >
            Add Payment
          </NavLink>
          <NavLink
            to="/GetPayments"
            className={`nav-link ${location.pathname === '/GetPayments' ? 'active-link' : ''}`}
          >
            View Payments
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Menu;
