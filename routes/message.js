const express = require("express");
const router = express.Router();
const Auth = require("../app/middlewares/Auth");

const messageController = require("../app/controllers/MessageController");

//[GET] domain.com/message/
router.get("/", Auth, messageController.index);
//[POST] domain.com/message/
router.post("/:id", Auth, messageController.handleConversation);

module.exports = router;
