const userQueries = {
    signUpUser: `
    INSERT INTO Users (Username, Email, Password)
    VALUES ($1, $2, $3)`,
    getUserByEmail: `
    SELECT * FROM Users 
    WHERE Email = $1`,
    getAllUser: `
    SELECT * FROM Users;`,
    updateUser: `
    UPDATE Users
    SET Username = $2, Email = $3, Password = $4
    WHERE Email = $1`,
    deleteUser: `
    DELETE FROM Users 
    WHERE Email = $1`,
    logIn: `
    UPDATE Users
    SET Logged = true
    WHERE Email =$1
    RETURNING *`,
    logOut: `
    UPDATE Users
    SET Logged = false
    WHERE Email =$1
    RETURNING *`
}

module.exports = userQueries;