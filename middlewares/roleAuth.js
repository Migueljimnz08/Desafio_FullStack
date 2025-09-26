/**
 * Middleware para autorizar el acceso según el rol del usuario.
 * @function authorizeRole
 * @param {string} role - Rol requerido para acceder.
 * @returns {Function} Middleware de Express.
 */
function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role === role) {
            return next();
        } else {
            return res.status(403).send('Access denied');
        }
    };
}

module.exports = authorizeRole;
