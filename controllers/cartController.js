const { cartValiate } = require("../validators/cartValidator");
const { addToCart, getCart } = require("../models/courseModel");



const getCartData = async (req, res, next) => {
  try {
    const cart = await getCart();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const addCart = async (req, res, next) => {
  try {
    const cartData = await cartValiate.validateAsync(req.body);
    console.log(cartData);
    const saveCart = await addToCart(cartData);
    res.json({
      message: "Course Added to the cart",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { addCart, getCartData };
