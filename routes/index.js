const toolsRoute = require("./tools");
const authRoute = require("./auth");
const meRoute = require("./me");
const siteRoute = require("./site");
const apiRoute = require("./api");
const globalRoute = require("./global");

const TEST = require("../app/middlewares/TEST"); //  middleware application
const ErrorHandler = require("../app/middlewares/ErrorHandler"); //error handler middleware
const cookieParser = require("cookie-parser");
route = (app) => {
  app.use(ErrorHandler);
  app.use("/", TEST);
  app.use(cookieParser());
  //use routes
  app.use("/api", apiRoute);
  app.use("/global", globalRoute);
  app.use("/tools", toolsRoute);
  app.use("/auth", authRoute);
  app.use("/me", meRoute);
  app.use("/home", siteRoute);
  app.use("/", siteRoute);
};

module.exports = route;
