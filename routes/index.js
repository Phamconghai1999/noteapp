const siteRoute = require("./site");
const Auth = require("../app/middlewares/Auth");

route = (app) => {
  app.use("/", Auth);
  app.use("/", siteRoute);
};

module.exports = route;
