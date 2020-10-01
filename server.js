const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/database.config.js");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));

mongoose.Promise = global.Promise;
mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  //testing
  res.json("Welcome to Green-Core Mobile App backend - testing  ");
});

// routes
//const userRoutes = require("./app/routes/users.routes");
const chatRoutes = require("./app/routes/chatRoutes");
const signupRoutes = require("./app/routes/signup");
const unitRoutes = require("./app/routes/unitRoutes");
const userRoutes = require("./app/routes/userRoutes");
const plantRoutes = require("./app/routes/plantTips.routes");
const dashboardRoutes = require("./app/routes/dashboardRoutes")


// Use Routes
app.use("/users", userRoutes);
app.use("/chats", chatRoutes);
app.use("/signup",signupRoutes);
app.use("/units", unitRoutes);
app.use("/plants", plantRoutes);
app.use("/dashboard", dashboardRoutes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
