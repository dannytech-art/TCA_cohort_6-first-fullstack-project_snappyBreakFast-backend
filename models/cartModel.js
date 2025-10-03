const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: {
      type: [
        {
          foodId: { type: mongoose.Schema.Types.ObjectId, ref: "foods", required: true },
          quantity: { type: Number, required: true },
        },
      ],
      default: []
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;
