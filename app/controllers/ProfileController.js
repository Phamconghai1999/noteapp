const { mongooseToObject } = require("../../util/mongooseObj");
const Account = require("../models/Account"); // import model from models.

class ProfileController {
  // [GET] domain.com/me/profile
  index(req, res, next) {
    //console.log(req.userData);
    let userTokenData = { ...req.userData };
    Account.findOne({ email: userTokenData.email }).exec(function (err, user) {
      if (err || !user) {
        return res.redirect("/auth/login");
      }
      res.render("me/profile", {
        userData: {
          email: user.email,
          userName: user.name,
          avatar: user.avatar,
        },
      });
    });
  }
}

module.exports = new ProfileController(); // export class
