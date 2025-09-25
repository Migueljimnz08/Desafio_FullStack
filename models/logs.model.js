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

//Logs por id
const getLogsById = async (logId) => {
    const rows = await executeQuery(queries.getLogsById, [logId])
    return rows;
};

// Obtener datos de cada columna
const getPhishingById = async (logId) => {
    const rows = await executeQuery(queries.getPhishingById, [logId]);
    return rows;
};

const getLoginByid = async (logId) => {
    const rows = await executeQuery(queries.getLoginByid, [logId]);
    return rows;
};

const getDdosById = async (logId) => {
    const rows = await executeQuery(queries.getDdosById, [logId]);
    return rows;
};

module.exports = {
    getAllLogs,
    getLogsBySeverity,
    updateStatus,
    getLogsById,
    getPhishingById,
    getLoginByid,
    getDdosById
}