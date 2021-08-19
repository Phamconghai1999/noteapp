const Account = require("../models/Account"); // import model from models.

class ToolsController {
  // [GET] domain.com/tools/messenger
  messenger(req, res, next) {
    let userData = { ...req.userData };
    res.render("tools/messenger", { userData, port: "3000" });
  }
}

module.exports = new ToolsController(); // export class
