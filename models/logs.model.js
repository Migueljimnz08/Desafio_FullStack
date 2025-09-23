const queries = require('../queries/logs.queries');
const { executeQuery } = require('../utils/pgHelper');

// Traer todo de la tabla logs
const getAllLogs = async () => {
    const rows = await executeQuery(queries.getAllLogs);
    return rows;
};

//LOGS POR SEVERIDAD
const getLogsBySeverity = async (severity) => {
    const rows = await executeQuery(queries.getLogsBySeverity, [severity])
    return rows;
};

module.exports = {
    getAllLogs,
    getLogsBySeverity
}