import React, { useState } from "react";
import FireWatchDashboard from '../../assets/FireWatch5.png';
import FireWatchLogin from '../../assets/FireWatch4.png';
import { useUser } from "../../context/UserContext/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Header = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
    const handleLogout = async () => {
      await logout();
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate('/');
      }, 1500);
    };
    return (
      <header className="header-dashboard">
        <div className="Logo">
          <img src={FireWatchDashboard} alt="Logo" />
        </div>
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ zIndex: 9999 }}>
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 600 }}>
            ¡Sesión cerrada correctamente!
          </Alert>
        </Snackbar>
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
