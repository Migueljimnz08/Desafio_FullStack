import React from "react";
import { Link } from "react-router-dom";
import gatete404 from '../../../assets/gatete404.jpg'

const NotFound = () => {
  return (
  <section className="not-found">
    <h1>Ruta no encontrada!</h1>
    <img className='picture' src={gatete404} alt="Gatito" />
    <div className="buttons">
      <Link to="/dashboard" className="back-home">
          Volver al Inicio
      </Link>
      <Link to="/" className="back-login">
          Volver al Login
      </Link>
    </div>
  </section>
  );
};

export default NotFound;
