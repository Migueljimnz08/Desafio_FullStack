import { useState } from 'react';
import { login } from '../../../services/userServices';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../../context/UserContext/useUser';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { startLogging } from '../../../services/logServices';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { checkAuth } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      await checkAuth();
      startLogging();
      setOpen(true); // Mostrar el mensaje
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (<section className='login-page'>
    <div className='login-form'>
      <h2>Bienvenido</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Iniciar sesión</button>
        {error != null ? <p>{error}</p> : null}
      </form>
    </div>
       <Snackbar
         open={open}
         autoHideDuration={1500}
         onClose={() => setOpen(false)}
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         sx={{ zIndex: 9999 }}>
         <Alert
           onClose={() => setOpen(false)}
           variant="filled" severity="success"
           sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 600 }}>
           ¡Inicio de sesión exitoso!
         </Alert>
       </Snackbar>
  </section>);
}

export default Login;