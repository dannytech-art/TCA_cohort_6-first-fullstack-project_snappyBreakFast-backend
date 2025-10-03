const { addToCart } = require("../controllers/cartController");

const router = require("express").Router();

router.post("/cart/:userId/:foodId", addToCart);
module.exports = router;
