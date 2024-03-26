//Requires..
const Ajv = require("ajv");
const ajv = new Ajv();
require("ajv-formats")(ajv);

//Validation..
const portfolioSchema = {
  type: "object",
  properties: {
    date: {
      type: "string",
      format: "date",
    },
    owner: {
      type: "string",
    },

    url: { type: "string", pattern: ".(jpeg|png|jpg)$" },
    type: {
      type: "string",
      enum: ["UI/UX", "Graphic Design", "Digital Art", "Game Design"],
    },
  },
  required: ["date", "owner", "url", "type"],
  additionalProperties: true,
};
module.exports = ajv.compile(portfolioSchema);
