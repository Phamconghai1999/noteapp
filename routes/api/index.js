const express = require("express");
const router = express.Router();

const apiController = require("../../app/controllers/ApiController");

//[GET] domain.com/api/avatar/:id
router.get("/avatar/:id", apiController.avatar);

module.exports = router;
