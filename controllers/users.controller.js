const userAndAdmin = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//POST http://localhost:3000/api/login

/**
 * Inicia sesión de usuario.
 * @async
 * @function loginUser
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void}
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing necessary data' });
    }
    try {
        const user = await userAndAdmin.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            await userAndAdmin.logIn(email)
            const token = jwt.sign({ id: user.userid, email: user.email, role: user.role, logged: user.logged }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ msg: 'Login successful', token });
        } else {
            res.status(404).json({ message: 'Invalid credential' });
        }
    } catch (error) {
        console.error('ERROR in loginUser:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
};

//POST http://localhost:3000/api/logout

/**
 * Cierra la sesión del usuario.
 * @async
 * @function logoutUser
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void}
 */
const logoutUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const email = decoded.email;
    if (!email) {
        return res.status(400).json({ error: 'Invalid email or token' });
    }
    try {
        const result = await userAndAdmin.logOut(email);
        if (result === 0){
            return res.status(404).json({ error: 'User not found' });
        }
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('ERROR in logoutUser:', error);
        res.status(500).json({ error: 'Error logging out user' });
    }
};

// GET http://localhost:3000/api/me

/**
 * Obtiene la información del usuario autenticado.
 * @function getCurrentUser
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void}
 */
const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'No authenticated user' });
  }
  const { id, email, role, logged } = req.user;
  return res.status(200).json({ id, email, role, logged });
};

module.exports = {
    loginUser,
    logoutUser,
    getCurrentUser
};