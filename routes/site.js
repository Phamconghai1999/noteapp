const express = require("express");
// const app = express(); // not used because define at index.js
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

// simple logger for this router's requests
// all requests to this router will first hit this middleware
//siteController.index
router.get("/", siteController.index);

module.exports = router;
