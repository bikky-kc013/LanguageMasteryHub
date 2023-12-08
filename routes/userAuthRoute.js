const express = require("express");
const { registerUser,loginUser } = require("../controllers/userAuthControllers");
const userAuthRouter = express.Router();



userAuthRouter.post('/register', registerUser);
userAuthRouter.post('/login', loginUser);

module.exports = { userAuthRouter };

