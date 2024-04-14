const Ajv = require("ajv");
const ajv = new Ajv();
require("ajv-formats")(ajv);

const ClientSchema = {
  type: "object",
  properties: {
    fullName: { type: "string", pattern: "^[a-zA-Z ]*$" },
    userName: { type: "string" },
    email: {
      type: "string",
      pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
    },
    password: {
      type: "string",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
    },

    userType: {
      type: "string",
      enum: ["Freelancer", "Client", "Admin"],
    },
    profilePicture: {
      type: "string",
    },
    coverPicture: { type: "string" },

    joinDate: {
      type: "string",
      format: "date",
    },
    favTopics: {
      type: "string",
    },
    following: {
      type: "array",
      items: { type: "string" },
    },

    previousFreelancers: {
      type: "array",
      items: { type: "string" },
    },
    verificationToken: { type: "string" },
    isVerified: { type: "boolean", default: false },
    resetToken: { type: "string" },
    isGoogle: { type: "boolean", default: false },
  },
  required: ["fullName", "userName", "password", "userType", "email"],
};

module.exports = ajv.compile(ClientSchema);
