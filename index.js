//#region Imports
const express = require("express");
const app = express();
//#endregion

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 7007;
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

// //#region Portfolio Routes
const portfolioRoutes = require("./Routes/portfolioRouts");
app.use("/api/portfolio", portfolioRoutes);
// //#endregion
