const Account = require("../models/Account"); // import model from models.
const Globalchanel = require("../models/Globalchanel"); // import model from models.

class ToolsController {
  // [GET] domain.com/tools/messenger
  index = async (req, res, next) => {
    const userData = { ...req.userData };
    // console.log(userData);
  };
}

module.exports = new ToolsController(); // export class
