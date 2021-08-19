const { mongooseToObject } = require("../../util/mongooseObj");

class ProfileController {
  // [GET] domain.com/me/profile
  index(req, res, next) {
    //console.log(req.userData);
    let userData = { ...req.userData };
    res.render("me/profile", { userData });
  }
}

module.exports = new ProfileController(); // export class
