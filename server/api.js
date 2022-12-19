const { Router, response } = require("express");
const { passport } = require("./middleware");
const conn = require("./conn");

const api = Router();

api.post("/signup", (request, response) => {
  const { firstName, lastName, username, password } = request.body;
  const values = [firstName, lastName, username, password];
  conn.query("CALL signup(?, ?, ?, ?)", values, (error, rows) => {
    if (error) {
      console.log(error)
      response.status(400).send({ message: "FAILURE" });
    } else {
      response.status(200).send({ message: "SUCCESS" });
    }
  });
});

api.post("/signin", (request, response, next) => {
  passport.authenticate("local", (error, user) => {
    if (error || !user) {
      return response.status(400).send({ 
        error: "Incorrect username or password" 
      });
    } 
    request.login(user, next);
  })(request, response, next);
}, (request, response) => {
  response.status(200).send({
    user: request.user
  });
});

api.get("/user", (request, response) => {
  const { user } = request;
  response.send({ user });
});

api.get("/signout", (request, response) => {
  request.session.destroy();
  response.status(200).send({ message: "SUCCESS" });
});

module.exports = api;
