import { createContext, useContext, useEffect, useState } from "react";
import { logout as logoutService, getUserInfo } from '../../services/userServices';

// Crear contexto
const UserContext = createContext();

// Hook para usarlo 
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const checkAuth = async () => {
    try {
      const data = await getUserInfo()
        setUser(data);
    } catch (err) {
        console.error("Error:", err);
        setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await logoutService(); 
      setUser(null);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};