//Requires..
const portfolioModel = require("../Models/portfolioModel");
//const portfolioValidator = require("../Validators/portfolioValidator");
const portfoliosValidator = require("../Validators/portfolioValidator");
const { isValidObjectId } = require("mongoose");
//Methods..
//1-get all portfolios..
const getAllPortfolios = async (req, res) => {
  const categories = req.query.categories;

  if (!categories || categories.length === 0) {
    const allPortfolios = await portfolioModel.find({});
    return res.status(200).json({ data: allPortfolios });
  }
  const categoriesArray = categories.split(",");
  const portfolios = [];
  for (const category of categoriesArray) {
    const foundPosts = await portfolioModel.find({ type: category });
    portfolios.push(...foundPosts);
  }

  return res.status(200).json({ data: portfolios });
};

const getPortfolioByID = async (request, response) => {
  const id = request.params.id;
  let portfolio = await portfolioModel.findById(id);
  if (!id || !portfolio) {
    return response.status(400).json("Invalid id!");
  }
  return response.status(200).json(portfolio);
};
//2-add new portfolio
const addPortfolio = async (req, res) => {
  let newPortfolio = req.body;
  //check validation..
  if (portfoliosValidator(newPortfolio)) {
    await portfolioModel.create(newPortfolio);
    res
      .status(201)
      .json({ message: "Portfolio added", data: { newPortfolio } });
  }
  //if validator is false
  else {
    res.json({
      message:
        portfoliosValidator.errors[0].instancePath.substring(1) +
        " " +
        portfoliosValidator.errors[0].message,
    });
  }
};

//3-remove portfolio..
const removePortfolio = async (req, res) => {
  let chosenPortfolio = req.body;
  //check for id object ..
  if (!isValidObjectId(chosenPortfolio._id)) {
    return res.status(400).json({ message: "Invalid portfolio ID" });
  }
  let foundPortfolio = await portfolioModel.exists({
    _id: chosenPortfolio._id,
  });
  //check if portfolio does exist..
  if (foundPortfolio) {
    console.log(foundPortfolio);
    await portfolioModel.deleteOne({ _id: chosenPortfolio._id });
    res.json({ message: "Portfolio Deleted Successfully" });
  } else {
    res.json({ message: "No Matched Portfolios " });
  }
};

const OwnerPortfolio = async (req, res) => {
  const ownerID = req.body.ownerID;
  try {
   // console.log(ownerID);
    let portfolio = await portfolioModel.find({ ownerID: ownerID });
   // console.log(portfolio);
    if (!portfolio) {
      return res.status(404).json({ message: "owner has no posted work yet!" });
    }
    return res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Like = async (req, res) => {
  const portfolioId = req.body.portfolioId;
  const userId = req.body.userId;
  try {
    let portfolio = await portfolioModel.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    // Check if the user has already liked the post
    console.log(userId);
    if (portfolio.likes.includes(userId)) {
      portfolio.likesCount -= 1;
      portfolio.likes = portfolio.likes.filter((id) => id !== userId);
      await portfolio.save();
      res.json({
        isLike: false,
        message: "Like removed successfully",
        data: portfolio,
      });
    } else {
      portfolio.likesCount += 1;
      portfolio.likes.push(userId);
      await portfolio.save();
      res.json({
        isLike: true,
        message: "Like added successfully",
        data: portfolio,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findPortfolioByCategory = async (request, response) => {
  const category = request.body.category;
  if (!category) {
    return response.status(404).json("Invalid category!");
  }
  let foundPosts = await portfolioModel.find({ type: category });
  return response.status(200).json({ Data: foundPosts });
};
const filter = async (req, res) => {
  try {
    var technologies = req.body.technologies.map(tech => tech.toLowerCase());
    var filteredPortfolio = await portfolioModel.find({});
    console.log(technologies);

    if (technologies && technologies.length > 0) {
      filteredPortfolio = filteredPortfolio.filter((item) => {
        return item.technologies.some((tech) => technologies.includes(tech.toLowerCase()));
      });
    }
    return res.json(filteredPortfolio);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};



//SALLAH -- MAHMOUD
//SALLAH -- MAHMOUD

// //4-update prtfolio..
// const updatePortfolio = async (req, res) => {
//   let chosenPortfolio = req.body;
//   let foundPortfolio = await portfolioModel.findOne({
//     _id: chosenPortfolio._id,
//   });
//   if (foundPortfolio) {
//     if (portfolioValidator(chosenPortfolio)) {
//       await portfolioModel.updateOne(
//         { _id: chosenPortfolio._id },
//         {
//           date: chosenPortfolio.date,
//           owner: chosenPortfolio.owner,
//           url: chosenPortfolio.url,
//           type: chosenPortfolio.type,
//         }
//       );
//       res.json({ message: "Portfolio Updated Successfully" });
//     } else {
//       res.json({ message: portfolioValidator.errors[0].message });
//     }
//   } else {
//     res.json({ message: "No Matched Portfolios to be deleted !!" });
//   }
// };
//export..
module.exports = {
  getAllPortfolios,
  getPortfolioByID,
  addPortfolio,
  removePortfolio,
  Like,
  findPortfolioByCategory,
  filter,
  OwnerPortfolio,
};
