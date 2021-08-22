const Account = require("../models/Account"); // import model from models.
const { multipleMongooseToObject } = require("../../util/mongooseObj");
const { mongooseToObject } = require("../../util/mongooseObj");

class GlobalController {
  // [GET] domain.com/global/userlist
  userlist(req, res, next) {
    let userData = { ...req.userData };
    var allUsers = [];
    Account.find({}, "name email avatar").exec(function (err, users) {
      res.render("tools/userlist", {
        userData,
        allUsers: multipleMongooseToObject(users),
      });
    });
  }
}

module.exports = new GlobalController(); // export class
