const Account = require("../models/Account"); // import model from models.
const Globalchanel = require("../models/Globalchanel"); // import model from models.

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
  // [GET] domain.com/global/message
  message = async (req, res, next) => {
    const userData = { ...req.userData };
    Globalchanel.find()
      .sort({ sendAt: -1 })
      .limit(10)
      .populate("user", ["name", "avatar"])
      .exec((err, messages) => {
        if (err) {
          res.render("tools/messenger", { userData });
        }
        var lastestMessage = [];
        for (let message of messages) {
          lastestMessage.push({
            user: message.user.name,
            avatar: message.user.avatar,
            message: message.message,
            time: Date.parse(message.sendAt),
          });
        }
        res.render("tools/globalchanel", { userData, lastestMessage });
      });
  };
}

module.exports = new GlobalController(); // export class
