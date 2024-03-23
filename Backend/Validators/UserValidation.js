const Ajv = require("ajv");
const ajv = new Ajv();
UsersSchema = {
  type: "object",
  properties: {
    firstname: { type: "string", pattern: "^[a-zA-Z]*$" },
    lastname: { type: "string", pattern: "^[a-zA-Z]*$" },
    age: { type: "integer" },
  },
  required: ["firstname", "lastname", "age"],
  additionalProperties: false,
};
module.exports = ajv.compile(UsersSchema);
