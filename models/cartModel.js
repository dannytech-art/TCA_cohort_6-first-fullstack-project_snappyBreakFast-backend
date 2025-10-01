const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    foodId: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "foods",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;
