const queries = require('../queries/logs.queries');
const { executeQuery } = require('../utils/pgHelper');


/**
 * Obtiene todos los logs de la base de datos.
 * @async
 * @function getAllLogs
 * @returns {Promise<Array>} - Array de logs.
 */
const getAllLogs = async () => {
    const rows = await executeQuery(queries.getAllLogs);
    return rows;
};


/**
 * Obtiene logs filtrados por severidad.
 * @async
 * @function getLogsBySeverity
 * @param {number} severity - Nivel de severidad.
 * @returns {Promise<Array>} - Array de logs filtrados.
 */
const getLogsBySeverity = async (severity) => {
    const rows = await executeQuery(queries.getLogsBySeverity, [severity])
    return rows;
};


/**
 * Actualiza el estado de un log.
 * @async
 * @function updateStatus
 * @param {number} id - ID del log.
 * @param {string} status - Nuevo estado.
 * @returns {Promise<Object>} - Resultado de la actualización.
 */
const updateStatus = async (id, status) => {
    return await executeQuery(queries.UpdateStatus, [id, status]);
};


/**
 * Obtiene logs por su ID.
 * @async
 * @function getLogsById
 * @param {number} logId - ID del log.
 * @returns {Promise<Array>} - Array de logs encontrados.
 */
const getLogsById = async (logId) => {
    const rows = await executeQuery(queries.getLogsById, [logId])
    return rows;
};


/**
 * Obtiene datos de phishing por ID de log.
 * @async
 * @function getPhishingById
 * @param {number} logId - ID del log.
 * @returns {Promise<Array>} - Datos de phishing encontrados.
 */
const getPhishingById = async (logId) => {
    const rows = await executeQuery(queries.getPhishingById, [logId]);
    return rows;
};


/**
 * Obtiene datos de login por ID de log.
 * @async
 * @function getLoginByid
 * @param {number} logId - ID del log.
 * @returns {Promise<Array>} - Datos de login encontrados.
 */
const getLoginByid = async (logId) => {
    const rows = await executeQuery(queries.getLoginByid, [logId]);
    return rows;
};


/**
 * Obtiene datos de DDOS por ID de log.
 * @async
 * @function getDdosById
 * @param {number} logId - ID del log.
 * @returns {Promise<Array>} - Datos de DDOS encontrados.
 */
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