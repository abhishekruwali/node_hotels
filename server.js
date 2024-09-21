const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body store
const PORT =process.env.PORT || 3000;

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
