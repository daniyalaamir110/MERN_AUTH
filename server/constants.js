const env = require("dotenv");

env.config();

module.exports = {
  DATABASE: {
    CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING
  },
  HTTP_SERVER: {
    PORT: process.env.HTTP_PORT
  },
  SESSION: {
    KEY: process.env.SESSION_KEY
  },
  ORIGIN: process.env.ORIGIN
}
