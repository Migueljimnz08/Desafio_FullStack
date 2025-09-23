import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
  <section className="not-found">
    <h1>Not Found!!</h1>
    <img className='picture' src="https://http.cat/images/404.jpg" alt="Gatito" />
    <div className="buttons">
      <Link to="/" className="back-home">
          Volver al Inicio
      </Link>
      <Link to="/login" className="back-login">
          Volver al Login
      </Link>
    </div>
  </section>
  );
};

export default NotFound;
