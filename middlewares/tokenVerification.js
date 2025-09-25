const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const jwt_secret = process.env.SECRET_KEY;

const protectedRoutes = express.Router();

/**
 * Middleware para proteger rutas mediante verificación de token JWT y usuario logueado.
 * @function
 */
protectedRoutes.use((req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).redirect('/login');
    }
    jwt.verify(token, jwt_secret, async (err, decoded) => {
        if (err) {
            return res.status(401).redirect('/login');
        } 
        if (!decoded || !decoded.email) {
            return res.status(401).redirect('/login');
        }
        let user = await User.getUserByEmail(decoded.email);
        if (!user || user.logged !== true) {
            res.json({ message: 'Invalid token or user not logged in'});
            return res.redirect('/login');
        } else {
            req.user = user
            req.decoded = decoded;
            next();
        }
    });
});

module.exports = protectedRoutes;