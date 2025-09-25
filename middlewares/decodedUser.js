const jwt = require('jsonwebtoken');

/**
 * Middleware para decodificar el token JWT y establecer el usuario en la petición.
 * @function setUser
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Función next de Express.
 * @returns {void}
 */
function setUser(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      res.locals.role = decoded.role;
      req.user = decoded;
    } catch {
      res.locals.role = null;
    }
  } else {
    res.locals.role = null;
  }
  next();
}

module.exports = setUser;