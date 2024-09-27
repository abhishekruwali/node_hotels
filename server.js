const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");


const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body store
const PORT = process.env.PORT || 3000;

// middleware function

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to :${req.originalUrl}`
  );
  next(); //Move onto the next phase
};

app.use(logRequest); //in all the route

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  res.send("Welcome to my hotel");
});
// Import the router file
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

// use the router files

app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("listen on port 3000");
});
