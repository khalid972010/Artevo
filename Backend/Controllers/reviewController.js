const Clients = require("../Models/ClientModel");
const Freelancers = require("../Models/FreelancerModel"); ///////////////////// UPDATE
const Reviews = require("../Models/reviewModel");

const getFreelancerReviews = async (request, response) => {
  try {
    let freelancerID = request.params.id;
    let reviews = await Reviews.find({ to: freelancerID });
    return response.status(200).json(reviews);
  } catch {
    return response.status(500).json("Internal Server Error!");
  }
};
const postReview = async (request, response) => {
  let client = request.body.client;
  let freelancerID = request.params.id;
  let freelancer = await Freelancers.findById(freelancerID);
  const description = request.body.description;
  const rate = request.body.rate;
  if (!rate || !description) {
    return response
      .status(404)
      .json({ message: "Review must include description and rate!" });
  }
  if (!client.previousFreelancers.includes(freelancerID)) {
    return response.status(401).json({ message: "Unauthorized review!" });
  }

  const duplicateReview = await Reviews.findOne({
    to: freelancerID,
    from: client._id,
  });
  if (duplicateReview) {
    return response
      .status(403)
      .json({ message: "You've already reviewed this freelancer!" });
  }
  const newReview = await Reviews.create({
    to: freelancerID,
    from: client._id,
    description: description,
    rate: rate,
  });
  freelancer.reviews.push(newReview);
  await Freelancers.findByIdAndUpdate(freelancerID, {
    reviews: freelancer.reviews,
  });
  response.status(200).json({ message: "Review added!" });
};

const editReview = async (request, response) => {
  let client = request.body.client;
  let freelancerID = request.params.id;
  const description = request.body.description;
  const rate = request.body.rate;
  if (!rate || !description) {
    return response
      .status(404)
      .json({ message: "Review must include description and rate!" });
  }
  if (
    !Reviews.findOne({
      to: freelancerID,
      from: client._id,
    })
  ) {
    return response.status(401).json({ message: "Unauthorized edit!" });
  }

  await Reviews.findOneAndUpdate(
    { to: freelancerID, from: client._id },
    {
      $set: {
        description: description,
        rate: rate,
      },
    }
  );
  response.status(200).json({ message: "Review edited!" });
};

const removeReview = async (request, response) => {
  let client = request.body.client;
  let freelancerID = request.params.id;
  let freelancer = await Freelancers.findById(freelancerID);
  if (!client.previousFreelancers.includes(freelancerID)) {
    return response.status(401).json({ message: "Unauthorized remove!" });
  }
  const review = await Reviews.findOneAndDelete({
    to: freelancerID,
    from: client._id,
  });
  if (review) {
    const index = freelancer.reviews.indexOf(review._id);
    freelancer.reviews.splice(index, 1);
    freelancer.save();
    return response.status(200).json({ message: "Review removed!" });
  }
};

module.exports = {
  getFreelancerReviews,
  postReview,
  editReview,
  removeReview,
};
