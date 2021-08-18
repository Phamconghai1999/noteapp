const express = require("express");
const router = express.Router();
const profileController = require("../app/controllers/ProfileController");
const Auth = require("../app/middlewares/Auth");

//[GET] domain.com/me/
router.get("/profile", Auth, profileController.index);

module.exports = router;
