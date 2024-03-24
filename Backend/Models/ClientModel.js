const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://khalid972010:khalid123@clusteriti.w66tmq7.mongodb.net/ArtLance"
);
const clientSchema = new mongoose.Schema(
  {
    fullName: String,
    userName: String,
    email: String,
    password: String,
    userType: String,
    profilePicture: String,
    joinDate: String,
    favList: [String],
    following:[String]
  },
  { versionKey: false }
);
const Clients = mongoose.model("Clients", clientSchema);

module.exports = Clients;

/* 	FullName
	UserName
	Pw
	UserType
	PP
	JoinDate
	FavList
	VisitList(Optional) */
