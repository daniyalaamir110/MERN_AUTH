// Import the dependencies
const passport = require("passport");
const conn = require("../conn");
const LocalStrategy = require("passport-local").Strategy;

// Authentication
passport.use(
  new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
  }, async (username, password, done) => {
    conn.query("CALL authenticate(?, ?)", [username, password], (error, rows) => {
      try {
        user = rows[0][0];
        done(error, user);
      } catch {
        done(null, false);
      }
    });
  })
);

passport.serializeUser(
  (user, done) => done(null, user.id)
);

passport.deserializeUser(
  (id, done) => {
    conn.query("SELECT * FROM userDetails WHERE id = ?", [id], (error, rows) => {
      try {
        const user = rows[0];
        done(error, user);
      } catch {
        done(null, false);
      }
    });
  }
);

module.exports = passport;