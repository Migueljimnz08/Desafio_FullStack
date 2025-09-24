import { useUser } from "../../context/UserContext/useUser";
import { Navigate } from "react-router-dom";

const AuthUser = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return <p>Cargando...</p>; 
  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default AuthUser;