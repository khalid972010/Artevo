const express = require("express");
const router = express.Router();
const clientController = require("../Controllers/clientController");
const clientMiddleware = require("../Middlewares/clientMiddleware");

//#region Get All Clients
router.get("/", clientController.getAllClients);
//#endregion

//#region Get Orders
router.get(
  "/orders",
  clientMiddleware.verifyTokenAndGetUserData,
  clientController.getMyOrders
);
//#endregion

//#region Get Client by id
router.get(
  "/:id",
  clientMiddleware.checkForClientID,
  clientController.getClient
);
//#endregion

//#region Create Client
router.post("/", clientController.createClient);
//#endregion

//#region Search for Freelancer
router.get("/search/freelancer", clientController.searchFreelancers);
//#endregion

//#region Follow Freelancer
router.post(
  "/follow/:id",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.followFreelancer
);
//#endregion

//#region unfollow Freelancer
router.post(
  "/unfollow/:id",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.unfollowFreelancer
);
//#endregion

//#region Create Order
router.post(
  "/orders/:id/request",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.requestOrder
);
//#endregion

//#region Complete Order
router.post(
  "/orders/:id/complete",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.completeOrder
);
//#endregion

//#region Add Review
router.post(
  "/reviews/:id/post",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.postReview
);
//#endregion

//#region Edit Review
router.patch(
  "/reviews/:id/edit",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.editReview
);
//#endregion

//#region Add Review
router.delete(
  "/reviews/:id/remove",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  clientController.removeReview
);
//#endregion

module.exports = router;
