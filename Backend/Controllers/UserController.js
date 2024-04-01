// Import the User model
//const UserModel = require("../Models/UserModel").UserModel;
const Clients = require("../Models/ClientModel");
const Freelancers = require("../Models/FreelancerModel");
const ClientValidator = require("../Validators/clientValidator");
const freelancerValidator = require("../Validators/FreelancerValidator");

const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request } = require("express");
//#region Profile
// Get all Users
const GetAllUsers = async (req, res) => {
  try {
    let allClients = await Clients.find({});
    let allFreelancers = await Freelancers.find({});
    const allUsers = [...allClients, ...allFreelancers];
    return res.json(allUsers);
  } catch (error) {
    return res.status(404).json({ message: "Failed to get all users!" });
  }
};
// GetProfile
const GetProfile = async (req, res) => {
  try {
    let client = await Clients.findById(req.params.id);
    let freelancer = await Freelancers.findById(req.params.id);
    let user = client || freelancer;
    if (!user) {
      return res.status(404).json({ message: "Couldn't find user!" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(404).json({ message: "Failed to get user!" });
  }
};
// Update Profile
const UpdateProfile = async (req, res) => {
  try {
    let user = req.body.user;
    let type = req.body.type;
    let newUser = Object.assign(user, req.body);
    console.log(newUser);

    if (type == "Client" && ClientValidator(newUser)) {
      console.log(user);

      const result = await Clients.updateOne(
        { _id: user._id },
        { $set: req.body }
      );

      return res.status(200).json({ message: "Updated Successfully!" });
    } else if (!ClientValidator(newUser)) {
      return res.json({
        message:
          ClientValidator.errors[0].instancePath.substring(1) +
          " " +
          ClientValidator.errors[0].message,
      });
    }

    if (type == "Freelancer" && freelancerValidator(newUser)) {
      await Freelancers.findByIdAndUpdate(user._id, { $set: req.body });
      return res.status(200).json({ message: "Updated Successfully!" });
    } else if (!freelancerValidator(newUser)) {
      return res.json({
        message:
          freelancerValidator.errors[0].instancePath.substring(1) +
          " " +
          freelancerValidator.errors[0].message,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: "Failed to get user!" });
  }
};
//#endregion

//#region Verification E-mail
async function sendEmail(email, t) {
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
    text: t, // Plain text body
  });
}
const sendVerification = async (req, res) => {
  let { email } = req.body;
  const verificationToken = uuidv4();
  let ToBeVerifiedClient = await Clients.findOne({ email: email });
  let ToBeVerifiedFreelancer = await Freelancers.findOne({
    email: email,
  });

  ToBeVerifiedUser = ToBeVerifiedClient || ToBeVerifiedFreelancer;
  ToBeVerifiedUser.verificationToken = verificationToken;
  ToBeVerifiedUser.save();
  let text = `Click the following link to verify your email: http://localhost:7005/api/users/verify/${verificationToken}`;
  try {
    await sendEmail(email, text);
    return res.json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return res.status(500).json({ error: "Failed to send verification email" });
  }
};

const verifyUser = async (req, res) => {
  let token = req.params.token;
  let ToBeVerifiedClient = await Clients.findOne({ verificationToken: token });
  let ToBeVerifiedFreelancer = await Freelancers.findOne({
    verificationToken: token,
  });

  ToBeVerifiedUser = ToBeVerifiedClient || ToBeVerifiedFreelancer;
  if (!ToBeVerifiedUser) {
    return res.status(404).send("Invalid or expired verification token");
  }
  ToBeVerifiedUser.isVerified = true;
  ToBeVerifiedUser.verificationToken = null;
  ToBeVerifiedUser.save();
  return res.send("Your email has been successfully verified");
};
//#endregion

//#region Reset Password

const sendResetToken = async (req, res) => {
  let { email } = req.body;
  const resetToken = uuidv4();
  let client = await Clients.findOne({ email });
  let freelancer = await Freelancers.findOne({ email });
  let TobeReset = client || freelancer;
  TobeReset.resetToken = resetToken;
  TobeReset.save();
  let text = `Click the following link to reset your password: http://localhost:7005/api/users/reset-password-form/${resetToken}`;
  try {
    await sendEmail(email, text);
    return res.json({ message: "reset password sent successfully" });
  } catch (error) {
    console.error("Error sending reset password:", error);
    return res.status(500).json({ error: "Failed to send reset password" });
  }
};
const getResetPasswordForm = async (req, res) => {
  const token = req.params.token;

  try {
    // Find user by reset token
    const client = await Clients.findOne({ resetToken: token });

    const freelancer = await Freelancers.findOne({ resetToken: token });

    user = freelancer || client;
    if (!user) {
      return res.status(404).send("Invalid or expired reset token");
    }

    // Render the password reset form
    return res.send("reset-password-form");
  } catch (error) {
    console.error("Error rendering reset password form:", error);
    return res.status(500).send("Internal Server Error");
  }
};
const resetPasswordSubmit = async (req, res) => {
  let token = req.params.token;
  let newPassword = req.body.newPassword;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (regex.test(newPassword)) {
    let ToBeResetClient = await Clients.findOne({ resetToken: token });
    let ToBeResetFreelancer = await Freelancers.findOne({ resetToken: token });
    let ToBeReset = ToBeResetClient || ToBeResetFreelancer;
    if (!ToBeReset) {
      return res.status(404).send("Invalid or expired reset token");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    ToBeReset.password = hashedPassword;
    ToBeReset.save();
    return res.send("Password reset successfully");
  }
  return res.status(400).json({
    Message:
      "Password must be 8 character long and has one uppercase character and one lowercase char",
  });
};
//#endregion

//#region Login
async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  let foundClientEmail = await Clients.findOne({ email });
  let foundFreelancerEmail = await Freelancers.findOne({ email });

  if (!foundClientEmail && !foundFreelancerEmail)
    return res.status(400).json("invalid email or password");

  foundEmail = foundFreelancerEmail || foundClientEmail;
  let isCorrectPass = await bcrypt.compare(password, foundEmail.password);

  if (!isCorrectPass) return res.status(400).json("invalid email or password");
  if (!foundEmail.isVerified)
    return res.status(400).json("Please activate your account");
  const accessToken = jwt.sign(
    { id: foundEmail.id, type: foundEmail.userType },
    "artlance",
    { expiresIn: "7d" }
  );
  res.header("x-auth-token", accessToken);
  return res.status(200).json("Login Successfully");
}

let findUserByMail = async (request, response) => {
  mail = request.params.email;
  let freelancer = await Freelancers.findOne({ email: mail });
  let client = await Clients.findOne({ email: mail });
  let user = freelancer || client;
  if (!user) {
    return response.status(404).json("Mail not found!");
  }
  return response.status(200).json({ User: user });
};
//#endregion
module.exports = {
  GetAllUsers,
  GetProfile,
  UpdateProfile,
  sendVerification,
  verifyUser,
  resetPasswordSubmit,
  getResetPasswordForm,
  sendResetToken,
  loginUser,
  findUserByMail,
};
