const modelLogs = require('../models/logs.model')

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

// Para pedir info de cada tipo por id
const getLogsWithDetails = async (req, res) => {
    const { type, logId } = req.query;

    try {
        if (!logId) {
            return res.status(400).json({ message: 'Missing logId in query' });
        }

        const logs = await modelLogs.getLogsById(logId);

        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: 'Log not found in main table' });
        }

        const log = logs[0];

        // Obtener detalles según tipo
        if (type) {
            if (type === 'phishing') {
                log.details = await modelLogs.getPhishingById(logId);
            } else if (type === 'login') {
                log.details = await modelLogs.getLoginByid(logId);
            } else if (type === 'ddos') {
                log.details = await modelLogs.getDdosById(logId);
            } else {
                return res.status(400).json({ message: 'Invalid type parameter' });
            }
        }

        res.status(200).json({ log });

    } catch (err) {
        console.error("Error fetching log:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    getLogs,
    updateStatus,
    getLogsWithDetails
};
