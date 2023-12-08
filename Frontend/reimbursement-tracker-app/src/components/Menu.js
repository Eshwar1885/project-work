// Menu.js
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import the menu icon
import './Menu.css'; // Import the CSS file

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for the "token" in local storage
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const logout = () => {
    // Clear the token and username from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    // Update the logged-in state
    setLoggedIn(false);
    // Redirect to the login page
    navigate('/Login');
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
    // Close the payment dropdown when profile dropdown is opened
    setPaymentDropdownOpen(false);
  };

  const togglePaymentDropdown = () => {
    setPaymentDropdownOpen(!isPaymentDropdownOpen);
    // Close the profile dropdown when payment dropdown is opened
    setProfileDropdownOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="center-container">
        <div className="nav-links">
          {/* Menu Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            <FaBars />
          </div>

          {isMenuOpen && ( // Only render menu items when isMenuOpen is true
            <>
              {!isLoggedIn ? (
                <NavLink to="/Login" className={`nav-link ${location.pathname === '/Login' ? 'active-link' : ''}`}>
                  Login
                </NavLink>
              ) : (
                <>
                  <NavLink to="/Home" className={`nav-link ${location.pathname === '/Home' ? 'active-link' : ''}`}>
                    Home
                  </NavLink>

                  {/* Profile Dropdown */}
                  <div className="profile-dropdown">
                    <div className={`nav-link ${isProfileDropdownOpen ? 'active-link' : ''}`} onClick={toggleProfileDropdown}>
                      Profiles
                    </div>
                    {isProfileDropdownOpen && (
                      <div className="dropdown-content">
                        <NavLink to="/add-profile" className={`nav-link ${location.pathname === '/add-profile' ? 'active-link' : ''}`}>
                          Add Profile
                        </NavLink>
                        <NavLink to="/user-profile" className={`nav-link ${location.pathname === '/user-profile' ? 'active-link' : ''}`}>
                          User Profile
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <NavLink to="/user-profiles" className={`nav-link ${location.pathname === '/user-profiles' ? 'active-link' : ''}`}>
                          User Profiles
                        </NavLink>

                  {/* Requests Dropdown */}
                  <div className="requests-dropdown">
                    <div className={`nav-link ${location.pathname === '/add-request' || location.pathname === '/user-requests' ? 'active-link' : ''}`}>
                      Requests
                    </div>
                    {isProfileDropdownOpen && (
                      <div className="dropdown-content">
                        <NavLink to="/add-request" className={`nav-link ${location.pathname === '/add-request' ? 'active-link' : ''}`}>
                          Add Request
                        </NavLink>
                        <NavLink to="/user-requests" className={`nav-link ${location.pathname === '/user-requests' ? 'active-link' : ''}`}>
                          User Requests
                        </NavLink>
                      </div>
                    )}
                  </div>
                  <NavLink to="/requests" className={`nav-link ${location.pathname === '/requests' ? 'active-link' : ''}`}>
                  All Requests
                  </NavLink>

                  {/* Payment Dropdown */}
                  <div className="payment-dropdown">
                    <div className={`nav-link ${isPaymentDropdownOpen ? 'active-link' : ''}`} onClick={togglePaymentDropdown}>
                      Payments
                    </div>
                    {isPaymentDropdownOpen && (
                      <div className="dropdown-content">
                        <NavLink to="/AddPayment" className={`nav-link ${location.pathname === '/AddPayment' ? 'active-link' : ''}`}>
                          Make Payment
                        </NavLink>
                        <NavLink to="/GetPayments" className={`nav-link ${location.pathname === '/GetPayments' ? 'active-link' : ''}`}>
                          View Payments
                        </NavLink>
                      </div>
                    )}
                  </div>

                  <div className="nav-link logout-button" onClick={logout}>
                    Logout
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
