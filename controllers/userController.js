const express = require("express");
const userLogin = express.Router({ mergeParams: true });
const { postNewUser } = require("../queries/user");
const { getAllUserActivities } = require("../queries/activity");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { response } = require("../app");

const ap = express();
const requiresLogin = (req, res, next) => {
  if (req.user) return next();

  res.sendStatus(401);
};

userLogin.post("/logout", requiresLogin, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

/*checks if a user is currently logged in and sends a response with the user info if a user is found else 
sends an error with message "user is not logged in" */
userLogin.get("/profile", function (req, res) {
  if (req.user) {
    const user = req.user;
    delete user.password;

    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "user is not logged in" });
  }
});

userLogin.post("/registration", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    const addUser = await postNewUser(newUser);

    if (addUser) {
      delete addUser.password;
      res.status(200).json(addUser);
    } else {
      res.status(400).json({ error: "User with this email already exist" });
    }
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

userLogin.post("/login", passport.authenticate("local"), (req, res) => {
  const foundUser = req.user;

  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(400).json({ error: "Entered wrong username or password" });
  }
});

userLogin.get("/listings", requiresLogin, async (req, res) => {
  const userActivities = await getAllUserActivities(req.user.id);

  if (userActivities) {
    return res.status(200).json(userActivities);
  } else {
    return res.status(404).json({ error: "Not Found!" });
  }
});

module.exports = userLogin;
