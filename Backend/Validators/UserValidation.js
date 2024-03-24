const Ajv = require("ajv");
const ajv = new Ajv();

const UsersSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      pattern: "^[a-zA-Z0-9_-]+$",
    },
    email: { type: "string" },
    password: { type: "string", minLength: 6 },
    usertype: { type: "string" },
    profilepic: { type: "string" },
    joindate: { type: "string" },
    fullName: { type: "string" },
    phoneNum: { type: "string", pattern: "^\\+?[0-9]{6,}$" },
    hourlyRate: { type: "number", minimum: 0 },
    description: { type: "string" },
    verificationToken: { type: "string" },
    isVerified: { type: "boolean" },
    resetToken: { type: "string" },
  },
  required: ["username", "email", "password", "usertype", "isVerified"],
  additionalProperties: false,
};

const ProfileSchema = {
  type: "object",
  properties: {
    firstname: { type: "string", pattern: "^[a-zA-Z]*$" },
    lastname: { type: "string", pattern: "^[a-zA-Z]*$" },
    age: { type: "integer" },
  },
  required: ["firstname", "lastname", "age"],
  additionalProperties: false,
};

module.exports = {
  UsersSchema: ajv.compile(UsersSchema),
  ProfileSchema: ajv.compile(ProfileSchema)
};
