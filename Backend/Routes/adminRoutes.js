const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const adminMiddleware = require("../Middlewares/adminMiddleware");

router.get("/", UserController.GetAllUsers);
router.get("/:id", UserController.GetProfile);
router.patch("/:id", UserController.UpdateProfile);
router.post("/send-verification-email", UserController.sendVerification);
router.post("/send-reset-password", UserController.sendResetToken);
router.post(
  "/reset-password-submit/:token",
  UserController.resetPasswordSubmit
);
router.get("/reset-password-form/:token", UserController.getResetPasswordForm);
router.get("/verify/:token", UserController.verifyUser);
router.post("/login", UserController.loginUser);
module.exports = router;
