const Session = require("express-session");
const constants = require("../constants");
const MySQLStore = require("express-mysql-session")(Session);

const session = conn => Session({
  secret: constants.SESSION.KEY,
  store: new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data"
      }
    }
  }, conn),
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: false
  }
});

module.exports = session;