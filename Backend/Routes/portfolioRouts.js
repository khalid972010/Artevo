//Requires..
const portfolioController = require("../Controllers/portfolioController");
const express = require("express");
const router = express.Router();

//mMthods..
//get all portfolios..
router.get("/", portfolioController.getAllPortfolios);

//add portfolios..
router.post("/", portfolioController.addPortfolio);

//remove portfolios..
router.delete("/", portfolioController.removePortfolio);

// //Update portfolios..
// router.put("/", portfolioController.updatePortfolio);

router.post("/Like", portfolioController.Like);
router.post("/filter", portfolioController.filter);
router.get("/OwnerPortfolio", portfolioController.OwnerPortfolio);

//export
module.exports = router;
