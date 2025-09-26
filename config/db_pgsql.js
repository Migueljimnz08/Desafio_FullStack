const { Pool } = require('pg');
require('dotenv').config();

/**
 * Pool de conexiones a PostgreSQL usando configuración de entorno.
 * @type {Pool}
 */
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;