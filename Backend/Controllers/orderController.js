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
const getFreelancerOrders = async (req,res)=>
{
  try{
   // console.log(req.body.freelancerID );
    let FreelancerOrders = await orderModel.find({ to : req.body.freelancerID });
   // console.log(FreelancerOrders);
     return res.status(201).json({  data: { FreelancerOrders } });
  }

  catch{
    return res.status(500).json({ message: "Internal server error " });
  }
  
  
}
const getClientOrders = async (req,res)=>
{
  try{
   // console.log(req.body.freelancerID );
    let clientOrders = await orderModel.find({ from : req.body.clientID });
   // console.log(FreelancerOrders);
     return res.status(201).json({  data: { clientOrders } });
  }

  catch{
    return res.status(500).json({ message: "Internal server error " });
  }
  
  
}
const updateOrderStatus=async(req,res)=>{
  try{
   // console.log("1",req.body);
     let Order = await orderModel.findById( req.body.orderID );
    // console.log("2",Order);
     Order.state=req.body.orderStatus;
    // console.log("3",Order);
     await Order.save();
    // console.log("4",Order);
    
      return res.status(201).json(  Order  );
   }
 
   catch{
     return res.status(500).json({ message: "Internal server error " });
   }
   
}

const updateFreelancerResponse=async(req,res)=>{
  try{
   // console.log("1",req.body);
     let Order = await orderModel.findById( req.body.orderID );
    // console.log("2",Order);
     Order.FreelancerResponse=req.body.freelancerResponse;
     Order.state="Completed";
    // console.log("3",Order);
     await Order.save();
    // console.log("4",Order);
    
      return res.status(201).json(  Order  );
   }
 
   catch{
     return res.status(500).json({ message: "Internal server error " });
   }
   
}

  
module.exports = {
    createOrder,
    getFreelancerOrders,
    updateOrderStatus,
    updateFreelancerResponse,
    getClientOrders
};
