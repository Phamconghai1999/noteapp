require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");

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
app.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening on port 3000 or ${process.env.PORT}!`)
);
