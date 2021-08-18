const siteRoute = require("./site");

route = (app) => {
  app.use("/", siteRoute);
};

module.exports = route;
