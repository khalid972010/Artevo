const mongoose = require("mongoose");

//const Users = require("./UserModel");

mongoose.connect(
  "mongodb+srv://khalid972010:khalid123@clusteriti.w66tmq7.mongodb.net/ArtLance"
);
const FreelancerSchema = new mongoose.Schema(
  {
    fullName: String,
    userName: String,
    email: String,
    password: String,
    profilePicture: String,
    favTopics: String
    about: String,
    budget: { type: Number, default: 0 },
    coverPicture: String,
    headLine: { type: String, default: "" },
    location: { type: String, default: "" },
    userType: String, // Updateeeeeeee
    bookingOrder: [{ clientID: Number, status: String }],
    followers: [String], // Number-> for user id
    following: [String], //Number-> for user id
    links: [{ title: String, url: String }], // for social media accounts
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
    joinDate: Date,
    services: [
      {
        picture: String,
        title: String,
        price: Number,
        description: String,
        duration: Date,
      },
    ],
    verificationToken: String, // Updateeeeeeee
    isVerified: Boolean, // Updateeeeeeee
    resetToken: String,
  },
  { versionKey: false }
);
const Freelancers = mongoose.model("Freelancers", FreelancerSchema);

module.exports = Freelancers;
