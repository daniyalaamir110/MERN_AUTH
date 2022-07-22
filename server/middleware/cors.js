const constants = require("../constants");

const cors = (request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", constants.ORIGIN);
  response.setHeader("Access-Control-Allow-Methods", "GET, POST");
  response.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  response.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

module.exports = cors;