const Clients = require("../Models/ClientModel");
const Freelancers = require("../Models/FreelancerModel");
const jwt = require("jsonwebtoken");

const verifyTokenAndGetUserData = async (request, response, next) => {
  try {
    const token = request.headers["x-auth-token"];
    const decoded = jwt.verify(token, "artevo");
    const client = await Clients.findById(decoded.id);
    const Freelancer = await Freelancers.findById(decoded.id);
    if (!client && !Freelancer) {
      return response.status(400).json({ message: "Invalid ID!" });
    }
    const type = client == null ? "Freelancer" : "Client";
    request.body.user = client || Freelancer;
    request.body.type = type;
    next();
  } catch (error) {
    throw new Error("Failed to verify token: " + error.message);
  }
};

module.exports = {
  verifyTokenAndGetUserData,
};
