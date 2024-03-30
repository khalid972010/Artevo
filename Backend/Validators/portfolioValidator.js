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
    photos: {
      type: "array",
      items: {
        type: "string",
    //  pattern: ".(jpeg|png|jpg)$", // assuming URLs are used for photos
      },
    },
    description: {
      type: "string",
    },
    likesCount: {
      type: "integer",
      default: 0, // Set default value to 0
      minimum: 0, // assuming likes cannot be negative
    },
    likes: {
      type: "array",
      items: {
        type: "string"
      },
    },
    type: {
      type: "string",
      enum: ["UI/UX", "Graphic Design", "Digital Art", "Game Design"],
    },
  },
  required: ["date", "owner", "photos", "description", "type"],
  additionalProperties: true,
};
module.exports = ajv.compile(portfolioSchema);
