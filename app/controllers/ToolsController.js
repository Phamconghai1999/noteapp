const Account = require("../models/Account"); // import model from models.
const Globalchanel = require("../models/Globalchanel"); // import model from models.

class ToolsController {
  // [GET] domain.com/tools/messenger
  messenger = async (req, res, next) => {
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
        res.render("tools/messenger", { userData, lastestMessage });
      });
  };
}

module.exports = new ToolsController(); // export class
