const morgan = require('morgan')

/**
 * Token personalizado para obtener el host de la petición.
 * @function
 */
morgan.token('host', function (req, res) {
    return req.hostname;
});

/**
 * Token personalizado para obtener el body de la petición.
 * @function
 */
morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})

/**
 * Token personalizado para obtener parámetros de la petición.
 * @function
 */
morgan.token('param', function (req, res, param) {
    return req.params ? req.params[param] || '' : '';
});

module.exports = morgan;