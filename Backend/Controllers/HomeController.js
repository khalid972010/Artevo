const portfolio = require("../Models/portfolioModel");
const Clients = require("../Models/ClientModel");
const Freelancers = require("../Models/FreelancerModel");

let pickFav = async (req, res) => {
   let favList = req.body.favList;
   let currentClientId= req.body.ClientId;

   let currentClient = await Clients.findOne({ _id: currentClientId });
   currentClient.favList=favList;
   await currentClient.save();
   return res.status(200).json({ message: currentClient });
  };

  let explore = async (req, res) => {
    try {
        // Find all portfolio items
        let portfoliosItems = await portfolio.find({});
        
        // Find the current client
        let currentClient = await Clients.findOne({ _id: req.body.ClientId });
        
        // Filter portfoliosItems based on currentClient's favList
        let filteredPortfolios = portfoliosItems.filter(item => currentClient.favList.includes(item.type));
       // console.log(portfoliosItems);
       // console.log(currentClient.favList);
        
        return res.status(200).json({ filteredPortfolios });
    } catch (error) {
        console.error("Error while exploring:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

let followingList = async (req,res) =>{
    FollowingList =  await Freelancers.find({}).select("location headLine coverPicture profilePicture email userName  ");; 
    //console.log(FollowingList);
    let currentClient = await Clients.findOne({ _id: req.body.ClientId });
    FollowingList = FollowingList.filter(item => currentClient.following.includes(item._id));

    //console.log(currentClient.following);
    return res.status(200).json({ FollowingList });

}


  
  module.exports = {
    pickFav,
    explore,
    followingList
}
