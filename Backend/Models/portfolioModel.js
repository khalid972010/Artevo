//Requires and Connection..
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://khalid972010:khalid123@clusteriti.w66tmq7.mongodb.net/ArtLance"
);

//Create Schema..
let portfolioSchema = new mongoose.Schema(
  {
    date: String,
    owner: String,
    ownerID:String,
    photos: [String],
    description: String,
    likesCount: Number,
    likes: [String],
    type: String,
    technologies:[String]
  },
  { versionKey: false }
);

let portfolios = mongoose.model("portfolios", portfolioSchema);

module.exports = portfolios;
