//Requires..
const orderController = require("../Controllers/orderController");
const express = require("express");
const router = express.Router();

router.post("/", orderController.createOrder);


//export
module.exports = router;
