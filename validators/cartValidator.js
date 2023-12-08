const joi = require("joi");

const cartValiate = joi.object({
  user_id: joi.string().required(),
  course_id: joi.number(),
  series_id: joi.number(),
});

module.exports = { cartValiate };
