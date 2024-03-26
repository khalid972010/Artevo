const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://khalid972010:khalid123@clusteriti.w66tmq7.mongodb.net/ArtLance"
);
const reviewSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    from: { type: mongoose.Schema.Types.ObjectId, required: true },
    to: { type: mongoose.Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  { versionKey: false }
);
const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
