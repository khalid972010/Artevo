const Ajv = require("ajv");
const ajv = new Ajv();
require("ajv-formats")(ajv);

const freelancerSchema = {
  type: "object",
  properties: {
    fullName: { type: "string", pattern: "^[a-zA-Z ]*$" },
    userName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    profilePicture: { type: "string" },
    coverPicture: { type: "string" },
    headLine: { type: "string" },
    location: { type: "string" },
    about: { type: "string" },
    favTopics: {
      type: "string",
    },
    bookingOrder: {
      type: "array",
      items: {
        type: "object",
        properties:{
        clientID: { type: "number" }, // Corrected "Number" to "number"

        status: { type: "string", enum: ["Accepted", "Pending", "Rejected"] }
      }
      }
     // required: ["clientID", "status"],
    },
    followers: {
      type: "array",
      items: { type: "string" },
    },
    following: {
      type: "array",
      items: { type: "string" },
    },
    links: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },

          url: { type: "string" },
        }
      },
    },
    reviews: {
      type: "array",
      items: { type: "string" },
    },
   // joinDate: { type: "string" },
    // Changed format to "date-time"
    verificationToken: { type: "string" },
    isVerified: { type: "boolean", default: false },
    resetToken: { type: "string" },
  },
  required: ["fullName", "userName", "email", "password"]
};

const validateFreelancer = ajv.compile(freelancerSchema);

module.exports = validateFreelancer;
