const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://khalid972010:khalid123@clusteriti.w66tmq7.mongodb.net/ArtLance"
);
const adminSchema = new mongoose.Schema(
  {
    userName: String,
    password: String,
  },
  { versionKey: false }
);
const Admins = mongoose.model("Admins", adminSchema);

module.exports = Admins;
