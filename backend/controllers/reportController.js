const Product = require("../models/Product");
const Deal = require("../models/Deal");
const Cart = require("../models/Cart");

const getAdminReports = async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalActiveDeals = await Deal.countDocuments({ isActive: true });
  const totalCartItems = await Cart.countDocuments();

  res.json({
    totalProducts,
    totalActiveDeals,
    totalCartItems,
  });
};

module.exports = { getAdminReports };