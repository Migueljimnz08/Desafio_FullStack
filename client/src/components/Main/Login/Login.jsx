import { useState } from 'react';
import { login } from '../../../services/userServices';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/')
    } catch (err) {
      setError(err.message);
    }
  };

  return (<section className='login-form'>
    <h2>Inicia sesión</h2>
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error!=null? <p>{error}</p>: null}
    </form>
  </section> );
}

export default Login;