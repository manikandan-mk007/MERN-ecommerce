const express = require("express");

const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:id", updateCartQuantity);
router.delete("/:id", removeCartItem);

module.exports = router;