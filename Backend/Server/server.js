const express = require("express");
const UserRoute = require("../Routes/UsersRoutes");
const app = express();
const PORT = process.env.PORT || 7005;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", UserRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
