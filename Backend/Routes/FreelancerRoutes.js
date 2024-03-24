//Requires..
const express = require("express");
const router = express.Router();
const freelancerController = require("../Controllers/FreelancerController");

//get all freelancer..
router.get("/", freelancerController.getAllfreelancers);
//#region Add freelancer
router.post("/", freelancerController.Addfreelancer);


router.get("/rana",(req, res) => {
    res.send("ya rab");
});

router.post("/follow", freelancerController.AddFollower);
router.post("/Unfollow", freelancerController.RemoveFollower);
router.get("/:id", freelancerController.getFreelancerByTD);


//#endregion

//export
module.exports = router;
