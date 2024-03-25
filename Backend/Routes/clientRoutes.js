const express = require("express");
const router = express.Router();
const clientController = require("../Controllers/clientController");
const clientMiddleware = require("../Middlewares/clientMiddleware");

//#region Get All Clients
router.get("/", clientController.getAllClients);
//#endregion

//#region Get Client by id
router.get("/:id", clientController.getClient);
//#endregion

//#region Create Client
router.post("/", clientController.createClient);
//#endregion
//#region Search for Freelancer
router.get(
  "/search/freelancer/:id",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.searchFreelancers
);
//#endregion

//#region Follow Freelancer
router.get(
  "/freelancer/:id/follow",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.followFreelancer
);
//#endregion

//#region unfollow Freelancer
router.get(
  "/freelancer/:id/unfollow",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.unfollowFreelancer
);
//#endregion
//#region Create Order
router.post(
  "/order/:id/request",
  clientMiddleware.verifyTokenAndGetUserData,
  clientController.requestOrder
);
//#endregion

//#region Complete Order
router.post(
  "/order/:id/complete",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.completeOrder
);
//#endregion

module.exports = router;
