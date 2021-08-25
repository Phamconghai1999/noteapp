const Account = require("../models/Account"); // import model from models.
const Globalchanel = require("../models/Globalchanel"); // import model from models.

class MessageController {
  // [GET] domain.com/tools/messenger
  index = async (req, res, next) => {
    const userData = { ...req.userData };
    // console.log(userData);
  };

  // [POST] domain.com/tools/messenger
  handleConversation = async (req, res, next) => {
    console.log(req.params.id);
    console.log(req.userData);
    console.log(req.body);
    res.json({ rev: req.params.id, send: req.userData, data: req.body });
    // console.log(userData);
  };
}

module.exports = new MessageController(); // export class
