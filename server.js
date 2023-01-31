const mysql = require("mysql");
require("dotenv").config();

// Create connection to database.
const connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

// Export connection.
module.exports = connection;
