const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/dbConfig");

async function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    db.any("SELECT * FROM users WHERE email = $1", [email])
      .then(function (results) {
        if (results.length) {
          const user = results[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "password is not correct" });
            }
          });
        } else {
          return done(null, false, { message: "email is not registered" });
        }
        // success;
      })
      .catch(function (error) {
        // error;
        console.error(error);
      });
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      authenticateUser
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.one(`SELECT * FROM users WHERE id=$1`, [id]);
      return done(null, user);
    } catch (error) {
      // error;
      console.error(error);
      return done(error);
    }
  });
}

module.exports = { initialize };
