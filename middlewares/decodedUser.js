const jwt = require('jsonwebtoken');

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