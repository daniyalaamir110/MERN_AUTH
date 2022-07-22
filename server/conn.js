const mysql = require("mysql");
const constants = require("./constants");

const connectionString = constants.DATABASE.CONNECTION_STRING;

const conn = mysql.createConnection(connectionString, {multipleStatements: true});

module.exports = conn;