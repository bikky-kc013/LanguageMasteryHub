const joi = require("joi");
const userAuthValidator = joi.object({
    username: joi.string().required().min(4),
    email:joi.string().email().required(),
    password:joi.string().required().min(4),
    location:joi.string().required(),
});

const loginValidator = joi.object({
    email:joi.string().required(),
    password:joi.string().required().min(4)
});


module.exports = { userAuthValidator, loginValidator };