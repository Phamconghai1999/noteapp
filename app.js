require("dotenv").config();
//
const express = require("express");
const app = express();
const route = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");
const cors = require("cors"); // CORS support
// const port = process.env.PORT || 3000;

// import socketIO
const socketio = require("./util/socketIO");
socketio(app);

const database = require("./config/db");
//use CORS support
app.use(cors());
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
      parseStringTime: (time) => {
        let Time = new Date(time);
        var month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return `${Time.getHours()}:${Time.getMinutes()} ${Time.getDate()} ${
          month[Time.getMonth()]
        }`;
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
// server.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
