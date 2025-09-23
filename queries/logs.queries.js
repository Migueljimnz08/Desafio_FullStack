const queries = {
    getAllLogs: `
    SELECT * 
    FROM "logs";`,
    getLogsBySeverity: ` 
    SELECT *
    FROM "logs"
    WHERE severity =$1`
}

module.exports = queries;