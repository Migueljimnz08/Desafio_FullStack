import React from "react";
import FireWatchLogo from '../../assets/FireWatch4.png';
import { useUser } from "../../context/UserContext/UserContext";

const Header = () => {

  const { user, logout } = useUser();

  return <header>
    <div className="Logo">
      <img src={FireWatchLogo} alt="Logo" />
    </div> 
    {user != null ? 
      <button className="logout-button" onClick={logout}>Logout</button>:
      null}
    </header>;
};

export default Header;
