//Requires..
const orderController = require("../Controllers/orderController");
const express = require("express");
const router = express.Router();

router.post("/", orderController.createOrder);
router.post("/FreelancerOrders",orderController.getFreelancerOrders);
router.post("/updateOrderStatus",orderController.updateOrderStatus);
router.post("/updateFreelancerResponse",orderController.updateFreelancerResponse);
router.post("/getClientOrders",orderController.getClientOrders)

router.post("/getOrderByID",orderController.getOrder)
router.post("/updateOrderPaymentStatus",orderController.updateOrderPaymentStatus);

//export
module.exports = router;
