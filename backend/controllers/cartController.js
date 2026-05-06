const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  const cartItems = await Cart.find().populate("product");
  res.json(cartItems);
};

const addToCart = async (req, res) => {
  const { productId } = req.body;

  let cartItem = await Cart.findOne({ product: productId });

  if (cartItem) {
    cartItem.quantity += 1;
    await cartItem.save();
  } else {
    cartItem = await Cart.create({
      product: productId,
      quantity: 1,
    });
  }

  req.io.emit("cart-changed");
  res.status(201).json(cartItem);
};

const updateCartQuantity = async (req, res) => {
  const { quantity } = req.body;

  const cartItem = await Cart.findById(req.params.id);

  if (!cartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  req.io.emit("cart-changed");
  res.json(cartItem);
};

const removeCartItem = async (req, res) => {
  const cartItem = await Cart.findById(req.params.id);

  if (!cartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  await cartItem.deleteOne();

  req.io.emit("cart-changed");
  res.json({ message: "Cart item removed" });
};

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeCartItem,
};