const Clients = require("../Models/ClientModel");
const Freelancers = require("../Models/FreelancerModel");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

const checkForClientID = async (request, response, next) => {
  let ID = request.params.id;

  if (!isValidObjectId(ID)) {
    return response.status(400).json({ message: "Invalid Client ID!" });
  }

  let client = await Clients.findById(ID);
  if (client == undefined) {
    return response.status(404).json({ message: "Client not found!" });
  }
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
    const token = request.headers.token;
    const decoded = jwt.verify(token, "artlance");
    const client = await Clients.findById(decoded.id);
    if (!client) {
      return response.status(400).json({ message: "Invalid client ID!" });
    }
    request.body.client = client;
    next();
  } catch (error) {
    // Refresh?
    throw new Error("Failed to verify token: " + error.message);
  }
};

module.exports = {
  checkForClientID,
  verifyTokenAndGetUserData,
  checkForFreelancerID,
};
