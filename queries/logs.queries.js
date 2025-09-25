const queries = {
    getAllLogs: `
    SELECT * 
    FROM "logs";`,
    getLogsBySeverity: ` 
    SELECT *
    FROM "logs"
    WHERE severity =$1`,
    UpdateStatus: `
    UPDATE "logs"
    SET status= $2
    WHERE id= $1
    RETURNING *;`,
    getLogsById: `
    SELECT* 
    FROM "logs"
    WHERE id= $1`,
    getPhishingById: `
    SELECT *
    FROM phishing
    WHERE logs_id = $1`,
    getLoginByid: `
    SELECT *
    FROM login
    WHERE log_id = $1`,
    getDdosById: `
    SELECT *
    FROM ddos
    WHERE log_id = $1`
}

module.exports = queries;