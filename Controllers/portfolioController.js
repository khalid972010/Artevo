//Requires..
const portfolioModel = require("../Models/portfolioModel");
//const portfolioValidator = require("../Validators/portfolioValidator");
const portfoliosValidator = require("../Validators/portfolioValidator");
const { isValidObjectId } = require("mongoose");
//Methods..
//1-get all portfolios..
const getAllPortfolios = async (req, res) => {
  let allportfolios = await portfolioModel.find({});

  res.status(200).json({ data: allportfolios });
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
  addPortfolio,
  removePortfolio,
};
