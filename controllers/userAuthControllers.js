const {
  addUser,
  checkIfUserExists,
  getUserId,
  getUserPassword,
} = require("../models/userAuthModel");
const {
  userAuthValidator,
  loginValidator,
} = require("../validators/userAuthValidator");
const createError = require("http-errors");
const { accessToken } = require("../validators/jwtValidators");
const { isValid } = require("../helpers/passCheckers");

const registerUser = async (req, res, next) => {
  try {
    const userData = await userAuthValidator.validateAsync(req.body);
    const ifUserExists = await checkIfUserExists(userData);
    if (ifUserExists) throw createError.Conflict("This user already exists");
    const registerUser = await addUser(userData);
    const userId = await getUserId(userData.email);
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const loginData = await loginValidator.validateAsync(req.body);
    const userExists = await checkIfUserExists(loginData);
    if (!userExists) throw createError.NotFound("Sorry, user not found");
    const userPassword = await getUserPassword(loginData);
    const canAccess = await isValid(userPassword, loginData.password);
    if (!canAccess) throw createError.Unauthorized("sorry incorrect password");
    const userId = await getUserId(loginData.email);
    const loginAccessToken = await accessToken(userId);
    res.json({
      userId: userId,
      loginAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
