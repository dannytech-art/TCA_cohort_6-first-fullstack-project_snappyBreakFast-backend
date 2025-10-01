const cartModel = require("../models/cartModel");
const Foodmodel = require("../models/foodmodel");
const userModel = require("../models/userModels");

exports.addToCart = async (req, res) => {
  try {
    const { userId, foodId } = req.params;
    const { quantity } = req.body;

    let checkExistingCart = await cartModel.findOne({ user: userId });
    if (!checkExistingCart) {
      checkExistingCart = new cartModel({
        user: userId,
        items: [],
      });
    }
    const food = await Foodmodel.findById(foodId);
    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    const checkContent = checkExistingCart.items.find(
      (food) => food.foodId.toString() === foodId
    );

    if (checkContent) {
      checkContent.quantity += quantity;
    } else {
      checkExistingCart.items.push({ foodId, quantity });
    }
    await checkExistingCart.save();

    res.status(201).json({
      message: "Cart created successfully",
      data: checkExistingCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
