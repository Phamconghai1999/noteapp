const Account = require("../models/Account"); // import model from models.
const Globalchanel = require("../models/Globalchanel"); // import model from models.
const ConversationSchema = require("../models/ConversationSchema"); // import schema
const mongoose = require("mongoose");

class MessageController {
  // [GET] domain.com/tools/messenger
  index = async (req, res, next) => {
    const userData = { ...req.userData };
    // console.log(userData);
  };

  // [POST] domain.com/tools/messenger
  handleConversation = async (req, res, next) => {
    //   console.log(req.params.id);
    //   console.log(req.userData);
    //   console.log(req.body);
    //validate message
    if (req.body.msg !== "") {
      var collection = req.params.id + req.userData.userId;
      var Collection = mongoose.model(collection, ConversationSchema);
      Collection({ message: req.body.msg, user: req.userData.userId }).save(
        (err) => {
          console.log(err);
        }
      );
    }
    res.redirect("back");
    // console.log(userData);
  };
}

module.exports = new MessageController(); // export class
