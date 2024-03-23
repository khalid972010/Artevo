const mongoose = require("mongoose");
// Create Connection
mongoose.connect(
  "mongodb+srv://khalid972010:khalid123@clusteriti.w66tmq7.mongodb.net/ArtLance"
);

// Create Users Schema
let UsersSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    usertype: String,
    profilepic: String,
    joindate: Date,
    fullName: String,
    phoneNum: String,
    hourlyRate: Number,
    description: String,
    verificationToken: String,
    isVerified: Boolean,
    resetToken: String,
  },
  { versionKey: false }
);

let UserModel = mongoose.model("users", UsersSchema);

module.exports = {
  UserModel,
};
