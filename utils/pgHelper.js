const pool = require('../config/db_pgsql');

/**
 * Ejecuta una consulta en la base de datos PostgreSQL.
 * @async
 * @function executeQuery
 * @param {string} query - Consulta SQL a ejecutar.
 * @param {Array} [params=[]] - Parámetros para la consulta.
 * @returns {Promise<Array|number>} - Resultados de la consulta o número de filas afectadas.
 */
const executeQuery = async (query, params = []) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(query, params);
        result = data.rows || data.rowCount;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (client) client.release();
    }
    return result;
};

module.exports = { executeQuery };