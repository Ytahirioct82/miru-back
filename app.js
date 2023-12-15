const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { initialize } = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./db/db");

initialize(passport);
const app = express();
app.set("db", db);
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "https://miru-app.netlify.app",
      "https://miru-back.herokuapp.com",
    ],
  })
);
app.use(express.json({ limit: "25mb" }));

app.use(cookieParser());

let timeToLive = 1000 * 60 * 60 * 2;
app.set("trust proxy", 1);
app.use(
  session({
    name: "session_id",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: timeToLive,
      httpOnly: true,
      sameSite: app.get("env") === "development" ? true : "none",
      secure: app.get("env") === "development" ? false : true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

const activityController = require("./controllers/activityController");
const commentControllers = require("./controllers/commentControllers");
const userController = require("./controllers/userController");
const imageController = require("./controllers/imageControllers");
const cityController = require("./controllers/cityController");
const categoryController = require("./controllers/categoryController");

app.use("/cities", cityController);
app.use("/categories", categoryController);
app.use("/user", userController);
app.use("/activities", activityController);
app.use("/:id/comments", commentControllers);
app.use("/:id/images", imageController);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Miru");
});

app.get("*", (request, response) => {
  response.status(404).json({ Error: "Page Not Found!" });
});

module.exports = app;
