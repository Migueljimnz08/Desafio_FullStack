import React from "react";
import FireWatchDashboard from '../../assets/FireWatch5.png';
import FireWatchLogin from '../../assets/FireWatch4.png';
import { useUser } from "../../context/UserContext/useUser";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { user, logout } = useUser();
  const location = useLocation();

  // Solo logo en login
  if (location.pathname === '/' || location.pathname === '/login') {
    return (
      <header className="header-login">
        <div className="Logo">
          <img src={FireWatchLogin} alt="Logo" />
        </div>
      </header>
    );
  }

  // Logo + logout en dashboard
  if (location.pathname === '/dashboard') {
    return (
      <header className="header-dashboard">
        <div className="Logo">
          <img src={FireWatchDashboard} alt="Logo" />
        </div>
        <button className="logout-button" onClick={logout}>Log out</button>
      </header>
    );
  }

  // Por defecto solo logo
  return (
    <header className="default-header">
      <div className="Logo">
        <img src={FireWatchDashboard} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;
