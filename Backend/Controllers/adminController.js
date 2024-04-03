const Admins = require("../Models/adminModel");
const Orders = require("../Models/orderModel");
const Freelancer = require("../Models/FreelancerModel");
const FreelancerValidator = require("../Validators/FreelancerValidator");
const { isValidObjectId } = require("mongoose");

const getAllOrders = async (request, response) => {
  const allOrders = await Orders.find({});
  return response.status(200).json(allOrders);
};

const modifyOrder = async (request, response) => {
  const orderID = request.body.id;
  const newState = request.body.newState;
  if (
    newState == "Pending" ||
    newState == "inProgress" ||
    newState == "Refused" ||
    newState == "Completed"
  ) {
    let modifiedOrder = await Orders.findOne({ _id: orderID });
    if (!modifiedOrder) {
      return response.status(404).json("Couldn't find order!");
    }
    modifiedOrder.state = newState;
    await modifiedOrder.save();
    return response.status(200).json(modifiedOrder);
  }

  return response.status(400).json("Invalid state!");
};

const getAllfreelancers = async (request, response) => {
  let allfreelancers = await Freelancer.find({});
  return response.status(200).json({ data: allfreelancers });
};

const CreateFreelancer = async (request, response) => {
  let freelancer = request.body;
  try {
    if (await Freelancer.findOne({ email: freelancer.email })) {
      response.status(400).json({ message: "Email already exists!" });
    } else if (await Freelancer.findOne({ userName: freelancer.userName })) {
      response.status(400).json({ message: "Username already exists!" });
    } else {
      if (FreelancerValidator(freelancer)) {
        await Freelancer.create(freelancer);
        response
          .status(201)
          .json({ message: "Freelancer added", data: { freelancer } });
      } else {
        response.status(400).json({
          message: "Validation error: " + FreelancerValidator.errors[0].message,
        });
      }
    }
  } catch (error) {
    console.error("Error adding freelancer:", error);
    response.status(500).json({ error: "Failed to add freelancer" });
  }
};

const UpdateFreelancer = async (request, response) => {
  try {
    const freelancerID = request.body.id;

    if (
      !isValidObjectId(freelancerID) ||
      !(await Freelancer.findById(freelancerID))
    ) {
      return response.status(400).json({ message: "Invalid Freelancer ID!" });
    }
    let freelancer = await Freelancer.findById(freelancerID);

    let newFreelancer = Object.assign(freelancer, request.body);
    console.log(newFreelancer);

    await Freelancer.findByIdAndUpdate(newFreelancer._id, {
      $set: request.body,
    });
    return response.status(200).json({ message: "Updated Successfully!" });
  } catch (error) {
    return response.status(404).json({ message: "Failed to get user!" });
  }
};

const DeleteFreelancer = async (request, response) => {
  const freelancerID = request.body.id;

  if (
    !isValidObjectId(freelancerID) ||
    !(await Freelancer.findById(freelancerID))
  ) {
    return response.status(400).json({ message: "Invalid Freelancer ID!" });
  }
  let freelancer = await Freelancer.findByIdAndDelete(freelancerID);
  return response.status(200).json({ message: "Deleted Successfully!" });
};

const searchFreelancers = async (request, response) => {
  const query = request.query.query;

  if (!isNaN(query) || !query || query.length == 0)
    return response.status(400).json({ message: "Invalid query!" });

  const regex = new RegExp(".*" + query + ".*", "i");

  const results = await Freelancers.find({
    $or: [{ userName: { $regex: regex } }, { fullName: { $regex: regex } }],
  });

  return response.status(200).json(results);
};
module.exports = {
  getAllOrders,
  modifyOrder,
  getAllfreelancers,
  CreateFreelancer,
  UpdateFreelancer,
  DeleteFreelancer,
  searchFreelancers,
};
