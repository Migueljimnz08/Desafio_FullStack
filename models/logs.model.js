const queries = require('../queries/logs.queries');
const { executeQuery } = require('../utils/pgHelper');

// Traer todo de la tabla logs
const getAllLogs = async () => {
    const rows = await executeQuery(queries.getAllLogs);
    return rows;
};

module.exports = {
    getAllLogs
}