const Clients = require("../Models/ClientModel");
const Orders = require("../Models/orderModel");
const Users = require("../Models/UserModel");

// const Freelancers = require("../Models/freelancerModel"); ///////////////////// UPDATE
const ClientValidator = require("../Validators/ClientValidator");
const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let getAllClients = async (request, response) => {
  let allClients = await Clients.find({});
  return response.status(200).json({ data: allClients });
};

let getClient = async (request, response) => {
  let ID = request.params.id;
  if (!isValidObjectId(ID)) {
    return response.status(400).json({ message: "Invalid Client ID!" });
  }
  let client = await Clients.findById(ID);
  if (client == undefined) {
    return response.status(404).json({ message: "Client not found!" });
  }
  return response.status(200).json({ data: client });
};

let createClient = async (request, response) => {
  let client = request.body;

  if (await Clients.findOne({ email: client.email })) {
    return response.json({ message: "Mail already exists!" });
  }
  if (await Clients.findOne({ userName: client.userName })) {
    return response.json({ message: "user name already exists!" });
  }
  if (ClientValidator(client)) {
    client.password = await bcrypt.hash(client.password, 10);

    let newClient = await Clients.create(client);
    const token = jwt.sign(
      { id: newClient._id.toString(), type: newClient.userType },
      "artlance",
      {
        expiresIn: "7d",
      }
    );
    response.header("x-auth-token", token);

    return response
      .status(201)
      .json({ message: "Client added", data: { client } });
  } else {
    response.json({
      message:
        ClientValidator.errors[0].instancePath.substring(1) +
        " " +
        ClientValidator.errors[0].message,
    });
  }
};

let searchFreelancers = async (request, response) => {
  const query = request.query.query;

  if (!isNaN(query) || query.length == 0)
    return response.status(203).json({ message: "Invalid query!" });

  // const regex = new RegExp(".*" + query + ".*", "i");

  // const results = await Freelancers.find({
  //   // Update!!!!!!!!!!!!!!!!!!!
  //   $or: [{ username: { $regex: regex } }, { fullName: { $regex: regex } }],
  // }).distinct("_id");

  // return res.status(200).json(results);
};

let requestOrder = async (request, response) => {
  const client = request.body.client;
  const orderDescription = request.body.description;
  const freelancerID = request.body.id;

  try {
    await Orders.create({
      from: client._id,
      to: freelancerID,
      description: orderDescription,
    });
    return response
      .status(200)
      .json({ message: "Order Created Successfully!" });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
};

let completeOrder = async (request, response) => {
  const clientID = request.body.client._id.toString();
  const freelancerID = request.body.id;

  if (!isValidObjectId(clientID) || !(await Clients.findById(clientID))) {
    return response.status(400).json({ message: "Invalid Client ID!" });
  }

  // let order =
};

let followFreelancer = async (request, response) => {
  // Test!!!!!!!!!!!!!!
  const client = request.body.client;
  const freelancerID = request.body.id;
  await Clients.findByIdAndUpdate(client._id, {
    $addToSet: { favList: freelancerID },
  });
  return response.status(200).json({ message: "Freelancer followed!" });
};

let unfollowFreelancer = async (request, response) => {
  // Test!!!!!!!!!!!!!!
  const client = request.body.client;
  const freelancerID = request.body.id;
  await Clients.findByIdAndUpdate(client._id, {
    $pull: { favList: freelancerID },
  });
  return response.status(200).json({ message: "Freelancer unfollowed!" });
};

module.exports = {
  getAllClients,
  getClient,
  createClient,
  searchFreelancers,
  followFreelancer,
  unfollowFreelancer,
  requestOrder,
  completeOrder,
};

// To-do: Test All new functions, Complete search Freelancers, implement searchForClientID middleware
