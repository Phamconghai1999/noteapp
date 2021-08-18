const express = require("express");
const router = express.Router();
const Auth = require("../app/middlewares/Auth");

const siteController = require("../app/controllers/SiteController");

//[GET] domain.com/
router.get("/", Auth, siteController.index);

module.exports = router;
