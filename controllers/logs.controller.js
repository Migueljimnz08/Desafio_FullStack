const modelLogs = require('../models/logs.model')

/**
 * Obtiene los logs, filtrando por severidad si se indica.
 * @async
 * @function getLogs
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void}
 */
const getLogs = async (req, res) => {
    const { severity } = req.query;
    try {
        let logs;
        if (severity) {
            const sev = parseInt(severity, 10);
            if (isNaN(sev)) {
                return res.status(400).json({
                    message: "Severity must be a number",
                    items_found: 0,
                    data: []
                });
            }
            logs = await modelLogs.getLogsBySeverity(sev);
        } else {
            logs = await modelLogs.getAllLogs();
        }
        if (!logs || logs.length === 0) {
            return res.status(404).json({
                message: severity ? `No logs found with severity ${severity}` : "No logs found",
                items_found: 0,
                data: []
            });
        }
        res.status(200).json({
            message: `Found ${logs.length} log(s)` + (severity ? ` with severity ${severity}` : ""),
            items_found: logs.length,
            data: logs
        });
    } catch (err) {
        console.error("Error fetching logs:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// PUT http://localhost:3000/api/logs

/**
 * Actualiza el estado de un log.
 * @async
 * @function updateStatus
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void}
 */
const updateStatus = async (req, res) => {
    const { id, status } = req.body;
    if (!id || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const updatedStatus = await modelLogs.updateStatus(
            id,
            status
        );
        if (updatedStatus.rowCount === 0) {
            return res.status(404).json({ message: 'Could not find the log' });
        }
        res.status(200).json({ message: 'Status updated successfully', data: updatedStatus });
    } catch (error) {
        console.error('Error in updateStatus', error);
        res.status(500).json({ error: 'Error updating status' });
    }
};

/**
 * Obtiene los detalles de un log, combinando datos de tablas secundarias.
 * @async
 * @function getLogsWithDetails
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @returns {void}
 */
const getLogsWithDetails = async (req, res) => {
    const { logId } = req.query;
    if (!logId) {
        return res.status(400).json({ message: 'Missing logId in query' });
    }
    try {
        // Obtener log principal
        const mainLogs = await modelLogs.getLogsById(logId);
        if (!mainLogs || mainLogs.length === 0) {
            return res.status(404).json({ message: 'Log not found in main table' });
        }
        const mainLog = mainLogs[0];
        // Modelos secundarios
        const secondaryModels = [
            modelLogs.getPhishingById,
            modelLogs.getLoginByid,
            modelLogs.getDdosById
        ];
        let secondaryData = null;
        // Buscar en las tablas secundarias hasta encontrar coincidencia
        for (const modelFunc of secondaryModels) {
            const rows = await modelFunc(mainLog.id);
            if (rows && rows.length > 0) {
                secondaryData = rows[0];
                break;
            }
        }
        if (!secondaryData) {
            return res.status(404).json({ message: 'No matching details found in secondary tables' });
        }
        // Combinar la info del log principal con la fila coincidente
        const combinedLog = { ...mainLog, ...secondaryData };
        res.status(200).json({ log: combinedLog });
    } catch (err) {
        console.error("Error fetching log details:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getLogs,
    updateStatus,
    getLogsWithDetails
};
