const modelLogs = require('../models/logs.model')

const getLogs = async (req, res) => {
    const { severity } = req.query; // query param opcional

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

module.exports = {
    getLogs
};
