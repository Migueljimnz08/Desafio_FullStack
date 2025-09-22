const modelLogs = require('../models/logs.model')

// Traer todos los campos de la tabla logs
const getAllLogs = async (req, res) => {
    try {
        const logs = await modelLogs.getAllLogs();

        if (!logs || logs.length === 0) {
            return res.status(404).json({
                message: "No logs found",
                items_found: 0,
                data: []
            });
        }

        res.status(200).json({
            message: `Found ${logs.length} log(s)`,
            items_found: logs.length,
            data: logs
        });

    } catch (err) {
        console.error("Error fetching logs:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllLogs
};
