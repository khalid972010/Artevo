const express = require("express");
const router = express.Router();
const reviewController = require("../Controllers/reviewController");
const clientMiddleware = require("../Middlewares/clientMiddleware");

//#region Get Reviews
router.get(
  "/:id",
  clientMiddleware.checkForFreelancerID,
  reviewController.getFreelancerReviews
);
//#endregion

//#region Add Review
router.post(
  "/:id",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  reviewController.postReview
);
//#endregion

//#region Edit Review
router.patch(
  "/:id",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  reviewController.editReview
);
//#endregion

//#region Add Review
router.delete(
  "/:id",
  clientMiddleware.verifyTokenAndGetUserData,
  clientMiddleware.checkForFreelancerID,
  reviewController.removeReview
);
//#endregion

module.exports = router;
