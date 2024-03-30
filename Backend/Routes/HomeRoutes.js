//Requires..
const HomeController = require("../Controllers/HomeController");
const portfolioController = require("../Controllers/portfolioController");
const express = require("express");
const router = express.Router();

//mMthods..
//get all portfolios..
router.post("/pickFav", HomeController.pickFav);
router.get("/explore", HomeController.explore);

router.get("/followingList", HomeController.followingList);

module.exports = router;
