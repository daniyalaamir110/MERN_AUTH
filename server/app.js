// Import the dependencies
const express = require("express");
const conn = require("./conn");
const { cors, session, passport } = require("./middleware");
const cookieParser = require("cookie-parser");
const api = require("./api");
const constants = require("./constants");

// Create an express server
const app = express();
const port = constants.HTTP_SERVER.PORT || 3001;

// Connect with the database
conn.connect(err => console.log(err ? err : "DATABASE CONNECTED"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors);
app.set("trust proxy", 1);

// Expess session
app.use(session(conn));

// Cookie Parser
app.use(cookieParser(constants.SESSION.KEY));

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());

// API
app.use("/api", api);

// Start the server
app.listen(port, () => console.log(`SERVER LISTENING AT PORT ${port}`));
