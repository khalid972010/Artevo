//Requires..
const express = require("express");
const router = express.Router();
const freelancerController = require("../Controllers/FreelancerController");

//get all freelancer..
router.get("/", freelancerController.getAllfreelancers);
//#region Add freelancer
router.post("/", freelancerController.Addfreelancer);

router.post("/follow", freelancerController.AddFollower);
router.post("/Unfollow", freelancerController.RemoveFollower);
router.get("/search", freelancerController.searchFreelancers);
router.get("/:id", freelancerController.getFreelancerByTD);

router.use("*",(req, res) => {
    res.send("Defaultt");
});

//#endregion

//export
module.exports = router;
