const queries = {
    getAllLogs: `
    SELECT * 
    FROM "logs";`,
    getLogsBySeverity: ` 
    SELECT *
    FROM "logs"
    WHERE severity =$1`,
    UpdateStatus:`
    UPDATE "logs"
    SET status= $2
    WHERE id=$1
    RETURNING *;`
}

module.exports = queries;