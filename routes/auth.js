const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");

//[POST] domain.com/auth/
router.post("/login", authController.login);
router.post("/register", authController.register);
//[GET] domain.com/auth/
router.get("/register", authController.showRegister);
router.get("/logout", authController.logout);
router.get("/login", authController.index);
router.get("/", authController.index);

module.exports = router;
