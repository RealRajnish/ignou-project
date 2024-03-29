const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors"); //for resolving cors error
const path = require("path");

// // For cross domain cookies following headers are set
// header("Access-Control-Allow-Origin: http://origin.domain:port");
// header("Access-Control-Allow-Credentials: true");
// header("Access-Control-Allow-Methods: GET, POST");
// header("Access-Control-Allow-Headers: Content-Type, *");

app.use(cors({ origin: true }));

dotenv.config({ path: "./config.env" });

require("../db/conn");

app.use(express.json());
app.use(cookieParser());

// we link the router files to make our route easy
app.use(require("../router/auth"));

// For Production  mode
if (process.env.SITE === "CLIENT") {
  app.use(express.static(path.join(__dirname, "../client/", "build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../client", "index.html"));
  });
}
if (process.env.SITE === "ADMIN") {
  app.use(express.static(path.join(__dirname, "../admin/", "build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../admin", "index.html"));
  });
}

const PORT = process.env.PORT;

// Middelware
const middleware = (req, res, next) => {
  console.log(`Hello my Middleware`);
  next();
};

// app.get('/about', middleware, (req, res) => {
//     console.log(`Hello my About`);
//     res.send(`Hello About world from the server`);
// });

// app.get('/contact', (req, res) => {
//     res.send(`Hello Contact world from the server`);
// });

// app.get('/signin', (req, res) => {
//     res.send(`Hello Login world from the server`);
// });

// app.get('/signup', (req, res) => {
//     res.send(`Hello Registration world from the server`);
// });

app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
