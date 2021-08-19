require("dotenv").config();
var jwt = require("jsonwebtoken");
//
const express = require("express");
const app = express();
const route = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");

var server = require("http").Server(app);
var io = require("socket.io")(server);
const port = process.env.PORT || 3000;
//
io.on("connection", (client) => {
  let accessToken = client.handshake.headers.cookie.split("=")[1];
  jwt.verify(
    accessToken,
    `${process.env.JWT_SECRET_KEY}`,
    function (err, decoded) {
      console.log(decoded);
      userData = decoded;
    }
  );
  client.on("message", (data) => {
    console.log(data);
  });
  client.on("disconnect", () => {
    /* … */
  });
});

const database = require("./config/db");

//use session
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// connect database
database.connect();
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
// set static dir
app.use(express.static(__dirname + "/public"));
//Template engine
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => {
        return a + b;
      },
    },
  })
);
app.set("view engine", ".hbs");
// use routes
route(app);

// render application
// app.listen(process.env.PORT || 3000, () =>
//   console.log(`Example app listening on port 3000 or ${process.env.PORT}!`)
// );
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
