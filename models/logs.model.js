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

// Actualizar status
const updateStatus = async (id, status) => {
    return await executeQuery(queries.UpdateStatus, [id, status]);
};

module.exports = {
    getAllLogs,
    getLogsBySeverity,
    updateStatus
}