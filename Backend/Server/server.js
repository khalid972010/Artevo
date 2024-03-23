const express = require("express");
const UserRoute = require("../Routes/UsersRoutes");
const portfolioRoutes = require("../Routes/portfolioRouts");
const clientRoutes = require("../Routes/clientRoutes");
const app = express();
const PORT = process.env.PORT || 7005;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", UserRoute);

<<<<<<< Updated upstream
=======
//#region Client Routes
app.use("/api/clients", clientRoutes);
//#endregion

//#region Portfolio Routes
app.use("/api/portfolio", portfolioRoutes);
//#endregion

>>>>>>> Stashed changes
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
