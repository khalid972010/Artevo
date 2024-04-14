const express = require("express");
const router = express.Router();
const Admins = require("../Models/adminModel");
const adminController = require("../Controllers/adminController");

//#region Get All Orders
router.get("/orders", adminController.getAllOrders);

//#endregion

//#region Get Number of reviews
router.get("/reviews", adminController.getNumberOfReviews);

//#endregion

//#region Modify Order
router.post("/orders", adminController.modifyOrder);
//#endregion

//#region Get Freelancers
router.get("/clients", adminController.getAllClients);

//#endregion

//#region Delete Client
router.delete("/clients", adminController.deleteClient);

//#endregion

//#region Get Freelancers
router.get("/freelancers", adminController.getAllfreelancers);

//#endregion

//#region Create Freelancer
router.post("/freelancers", adminController.CreateFreelancer);

//#endregion

//#region Modify Freelancer
router.patch("/freelancers", adminController.UpdateFreelancer);

//#endregion

//#region Delete Freelancer
router.delete("/freelancers", adminController.DeleteFreelancer);

//#endregion

//#region Search Freelancers
router.get("/freelancers/search", adminController.searchFreelancers);

//#endregion

module.exports = router;
