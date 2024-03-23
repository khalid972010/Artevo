// Import the User model
const UserModel = require("../Models/UserModel").UserModel;
const UserValidator = require("../Validators/UserValidation");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// Get all Users
const GetAllUsers = async (req, res) => {
  console.log("im in controller");
  try {
    let allUsers = await UserModel.find({});
    console.log(allUsers);

    res.json(allUsers);
  } catch (error) {
    throw new Error("Failed to get all users: " + error.message);
  }
};
// GetProfile
const GetProfile = async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    console.log(user);
    res.json(user);
  } catch (error) {
    throw new Error("Failed to get user: " + error.message);
  }
};
// Update Profile
const UpdateProfile = async (req, res) => {
  try {
    let user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
    console.log(req.body);
    res.json(user);
  } catch (error) {
    throw new Error("Failed to get user: " + error.message);
  }
};
//#region Verification E-mail
async function sendVerificationEmail(email, verificationToken) {
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hire.hustle1@gmail.com", // Replace with your Gmail email
      pass: "ipozfcndqykqpslz", // Replace with your Gmail password
    },
  });

  // Send verification email
  let info = await transporter.sendMail({
    from: "hire.hustle1@gmail.com", // Sender address
    to: email, // Recipient address
    subject: "Email Verification", // Subject line
    text: `Click the following link to verify your email: http://localhost:7005/api/users/verify/${verificationToken}`, // Plain text body
  });

  console.log("Verification email sent:", info.messageId);
}
const sendVerification = async (req, res) => {
  let { email } = req.body;
  const verificationToken = uuidv4();
  console.log("im here " + email);
  let toBeVerifiedUser = await UserModel.findOne({ email });

  toBeVerifiedUser.verificationToken = verificationToken;
  toBeVerifiedUser.save();
  try {
    await sendVerificationEmail(email, verificationToken);
    res.json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
};

const verifyUser = async (req, res) => {
  let token = req.params.token;
  let ToBeVerifiedUser = await UserModel.findOne({ verificationToken: token });
  if (!ToBeVerifiedUser) {
    return res.status(404).send("Invalid or expired verification token");
  }
  ToBeVerifiedUser.isVerified = true;
  ToBeVerifiedUser.save();
  res.send("Your email has been successfully verified");
};
//#endregion

//#region Reset Password
async function sendPasswordResetEmail(email, resetToken) {
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "hire.hustle1@gmail.com",
      pass: "ipozfcndqykqpslz",
    },
  });

  // Send Reset password
  let info = await transporter.sendMail({
    from: "hire.hustle1@gmail.com", // Sender address
    to: email, // Recipient address
    subject: "Reset Password", // Subject line
    text: `Click the following link to reset your password: http://localhost:7005/api/users/reset-password/${resetToken}`,
  });
}

const sendResetToken = async (req, res) => {
  let { email } = req.body;
  const resetToken = uuidv4();
  let TobeReset = await UserModel.findOne({ email });

  TobeReset.resetToken = resetToken;
  TobeReset.save();
  try {
    await sendVerificationEmail(email, resetToken);
    res.json({ message: "reset password sent successfully" });
  } catch (error) {
    console.error("Error sending reset password:", error);
    res.status(500).json({ error: "Failed to send reset password" });
  }
};
const getResetPasswordForm = async (req, res) => {
  const token = req.params.token;

  try {
    // Find user by reset token
    const user = await UserModel.findOne({ resetToken: token });
    console.log(user);
    if (!user) {
      return res.status(404).send("Invalid or expired reset token");
    }

    // Render the password reset form
    res.send("reset-password-form");
  } catch (error) {
    console.error("Error rendering reset password form:", error);
    res.status(500).send("Internal Server Error");
  }
};
const resetPasswordSubmit = async (req, res) => {
  let token = req.params.token;
  let newPassword = req.body.newPassword;
  let ToBeReset = await UserModel.findOne({ resetToken: token });
  if (!ToBeReset) {
    return res.status(404).send("Invalid or expired reset token");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  ToBeReset.password = hashedPassword;
  ToBeReset.save();
  res.send("Password reset successfully");
};

module.exports = {
  GetAllUsers,
  GetProfile,
  UpdateProfile,
  sendVerification,
  verifyUser,
  resetPasswordSubmit,
  getResetPasswordForm,
  sendResetToken,
};
