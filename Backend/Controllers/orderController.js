//Requires..
const orderModel = require("../Models/orderModel");

const createOrder = async (req, res) => {
    let newOrder = req.body;
  try{
    await orderModel.create(newOrder);
    res
      .status(201)
      .json({ message: "Order added", data: { newOrder } });
  }
  catch{
    return res.status(500).json({ message: "Internal server error " });
  }

}

  
module.exports = {
    createOrder
};
