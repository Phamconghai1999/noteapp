const express = require("express");
const router = express.Router();
const Auth = require("../app/middlewares/Auth");

const globalController = require("../app/controllers/GlobalController");

//[GET] domain.com/

//[GET] domain.com/global/message
router.get("/message", Auth, globalController.message);
//[GET] domain.com/global/userlist
router.get("/userlist", Auth, globalController.userlist);
router.get("/", Auth, globalController.userlist);

module.exports = router;
