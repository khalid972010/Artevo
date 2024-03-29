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
      enum: ["UI/UX", "Graphic Design", "Digital Art", "Game Design"],
    },
    bookingOrder: {
      type: "object",
      properties: {
        clientID: { type: "number" }, // Corrected "Number" to "number"

        status: { type: "string", enum: ["Accepted", "Pending", "Rejected"] },
      },
      required: ["clientID", "status"],
    },
    followers: {
      type: "array",
      items: { type: "number" },
    },
    following: {
      type: "array",
      items: { type: "number" },
    },
    links: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },

          url: { type: "string" },
        },
        required: ["title", "url"],
      },
    },
    reviews: {
      type: "array",
      items: { type: "string" },
    },
    joinDate: { type: "string", format: "date-time" },
    // Changed format to "date-time"
    verificationToken: { type: "string" },
    isVerified: { type: "boolean", default: false },
    resetToken: { type: "string" },
  },
  required: ["fullName", "userName", "email", "password", "services"],
};

const validateFreelancer = ajv.compile(freelancerSchema);

module.exports = validateFreelancer;
