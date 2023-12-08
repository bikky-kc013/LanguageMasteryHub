const { addCart, getCartData } = require("../controllers/cartController");
const express = require("express");
const { verifyToken } = require("../validators/jwtValidators");
const cartRouter = express.Router();

cartRouter.post("/addToCart", verifyToken, addCart);
cartRouter.get("/getCart", getCartData);

module.exports = { cartRouter };
