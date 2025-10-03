const { addToCart } = require("../controllers/cartController");

const router = require("express").Router();

router.post("/cart/:userId/:productId", addToCart);
module.exports = router;
