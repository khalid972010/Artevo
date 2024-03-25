const Clients = require("../Models/ClientModel");
const Freelancers = require("../Models/FreelancerModel");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

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

module.exports = { verifyTokenAndGetUserData, checkForFreelancerID };
