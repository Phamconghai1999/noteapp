require("dotenv").config();
var jwt = require("jsonwebtoken");
//
const express = require("express");
const app = express();
const route = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");
const port = process.env.PORT || 3000;

var server = require("http").Server(app);
var io = require("socket.io")(server);
//
io.on("connect", (socket) => {
  let accessToken;
  let userData;
  let cookies = socket.handshake.headers.cookie.split(";");
  for (let cookie of cookies) {
    cookie.startsWith("accessToken") || cookie.startsWith(" accessToken")
      ? (accessToken = cookie.split("=")[1])
      : (accessToken = "noToken");
  }
  jwt.verify(
    accessToken,
    `${process.env.JWT_SECRET_KEY}`,
    function (err, decoded) {
      userData = decoded;
    }
  );
  socket.on("globalChanel", (data) => {
    if (data.accessToken) {
      jwt.verify(
        data.accessToken,
        `${process.env.JWT_SECRET_KEY}`,
        function (err, decoded) {
          try {
            if (decoded.userName) {
              sendGlobalChanel = {
                userName: decoded.userName,
                message: data.message,
              };
              io.emit("globalChanel", sendGlobalChanel);
            }
          } catch (error) {
            console.log(msg);
          }
        }
      );
    }
  });
  socket.on("disconnect", () => {
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
