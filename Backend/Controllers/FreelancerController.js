const Freelancer = require("../Models/FreelancerModel");
const Client = require("../Models/ClientModel");
const FreelancerValidator = require("../Validators/FreelancerValidator");

let getAllfreelancers = async (request, response) => {
  let allfreelancers = await Freelancer.find({});
  response.status(200).json({ data: allfreelancers });
};

let getFreelancerByTD = async (request, response) => {
  let freelancerID = request.params.id;
  let freelancer = await Freelancer.findById(freelancerID);
  if (freelancer) return response.status(200).json({ data: freelancer });
  return response.status(500).json({ error: "Not fount" });
};

let Addfreelancer = async (request, response) => {
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

let AddFollower = async (req, res) => {
  try {
    let freelancerID = req.body.freelancerID;
    let followerID = req.body.followerID;

    // Find the freelancer document by freelancerID
    let currentfreelancer = await Freelancer.findOne({ _id: freelancerID });
    let currentfollower = await Client.findOne({ _id: followerID });

    if (!currentfreelancer) {
      return res.status(404).json({ error: "Freelancer not found" });
    }
    // Check if the followerID exists in the freelancer's followers array
    if (currentfreelancer.followers.includes(followerID)) {
      return res
        .status(400)
        .json({ error: "You already follow this freelancer" });
    }
    // Follower does not exist, push the follower ID into the followers array
    currentfreelancer.followers.push(followerID);
    currentfollower.following.push(freelancerID);
    await currentfreelancer.save();
    await currentfollower.save();
    return res
      .status(200)
      .json({ message: "Follower added successfully for this freelancer" });
  } catch (error) {
    console.error("Error adding follower:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

let RemoveFollower = async (req, res) => {
  try {
    let freelancerID = req.body.freelancerID;
    let followerID = req.body.followerID;

    // Find the freelancer document by freelancerID
    let currentfreelancer = await Freelancer.findOne({ _id: freelancerID });
    let currentfollower = await Client.findOne({ _id: followerID });

    if (!currentfreelancer) {
      return res.status(404).json({ error: "Freelancer not found" });
    }

    // Check if the followerID exists in the freelancer's followers array
    if (!currentfreelancer.followers.includes(followerID)) {
      return res
        .status(400)
        .json({ error: "You already don't follow this freelancer" });
    }

    currentfreelancer.followers = currentfreelancer.followers.filter(
      (id) => id !== followerID
    );
    currentfollower.following = currentfollower.following.filter(
      (id) => id !== freelancerID
    );
    await currentfreelancer.save();
    await currentfollower.save();

    return res.status(200).json({ message: "Follower removed successfully " });
  } catch (error) {
    console.error("Error adding follower:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
let searchFreelancers = async (request, response) => {
  try {
    let queryName = request.query.fullName;

    if (queryName.length >= 1) {
      let searchResults = await Freelancer.find({
        $or: [
          { fullName: { $regex: `^${queryName}`, $options: "i" } },
          { userName: { $regex: `^${queryName}`, $options: "i" } },
          { email: { $regex: `^${queryName}`, $options: "i" } },
        ],
      });
      response.status(200).json({ data: searchResults });
    }
  } catch (error) {
    console.error("Error searching for freelancers:", error);
    response.status(500).json({ error: "Failed to search for freelancers" });
  }
};

const filter = async (req, res) => {
  try {
    const { Location, budget, JopTitle } = req.body;

    var allFreelancers = await Freelancer.find({});
    console.log(allFreelancers);

    if (Location !== "")
      allFreelancers = allFreelancers.filter(freelancer => freelancer.location === Location);

    if (JopTitle !== "")
      allFreelancers = allFreelancers.filter(freelancer => freelancer.headLine === JopTitle);
   
    if (budget && budget.min !== undefined && budget.max !== undefined) {
      


      allFreelancers = allFreelancers.filter(freelancer =>(  freelancer.budget <= budget.max));
      
    }
    console.log(req.body);
    console.log(allFreelancers);
    res.status(200).json( allFreelancers );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  getAllfreelancers,
  Addfreelancer,
  AddFollower,
  RemoveFollower,
  getFreelancerByTD,
  searchFreelancers,
  filter,
};
