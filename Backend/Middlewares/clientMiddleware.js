const Clients = require("../Models/ClientModel");
const Freelancers = require("../Models/FreelancerModel");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

const checkForClientID = async (request, response, next) => {
  let ID = request.params.id;
  //console.log(ID);
  if (!isValidObjectId(ID)) {
    return response.status(400).json({ message: "Invalid Client ID!" });
  }

  let client = await Clients.findById(ID);
 // console.log(client);
  if (client == undefined) {
    return response.status(404).json({ message: "Client not found!" });
  }
  next();
};
const checkForFreelancerID = async (request, response, next) => {
  const freelancerID = request.params.id;

  if (
    !isValidObjectId(freelancerID) ||
    !(await Freelancers.findById(freelancerID))
  ) {
    return response.status(400).json({ message: "Invalid Freelancer ID!" });
  }
  next();
};

const verifyTokenAndGetUserData = async (request, response, next) => {
  try {
    const token = request.headers["x-auth-token"];
    const decoded = jwt.verify(token, "artlance");
    const client = await Clients.findById(decoded.id);

    if (!client) {
      return response.status(400).json({ message: "Invalid client ID!" });
    }
    request.body.client = client;

    next();
  } catch (error) {
    throw new Error("Failed to verify token: " + error.message);
  }
};

module.exports = {
  checkForClientID,
  verifyTokenAndGetUserData,
  checkForFreelancerID,
};
