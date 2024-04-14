const express = require("express");
const UserRoute = require("../Routes/UsersRoutes");
const portfolioRoutes = require("../Routes/portfolioRouts");
const clientRoutes = require("../Routes/clientRoutes");
const FreelancerRoutes = require("../Routes/FreelancerRoutes");
const HomeRoutes = require("../Routes/HomeRoutes");
const adminRoutes = require("../Routes/adminRoutes");
const OrderRoutes = require("../Routes/OrderRoutes");
const ReviewsRoutes = require("../Routes/reviewRoutes");
const cors = require("cors");


const app = express();
const corsOptions = {
  origin: ["http://localhost:4200","https://4c38-156-209-81-63.ngrok-free.app" ],//nnd Allow requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow specified HTTP methods
  allowedHeaders: "*",
  exposedHeaders: ["x-auth-token"], // Allow specified headers
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 7010;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/admins", adminRoutes);

// Routes
app.use("/api/users", UserRoute);

//#region Client Routes
app.use("/api/clients", clientRoutes);
app.use("/api/clients/like/:id", clientRoutes);
//#endregion

//#region Portfolio Routes
app.use("/api/portfolio", portfolioRoutes);
//#endregion

//#region Freelancer Routes
app.use("/api/Freelancer", FreelancerRoutes);
//#endregion

//#region Freelancer Routes
app.use("/api/Home", HomeRoutes);
//#endregion
app.use("/api/Order", OrderRoutes);

//#region Review Routes
app.use("/api/reviews", ReviewsRoutes);
//#endregion

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
