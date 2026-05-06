const Deal = require("../models/Deal");

const getDeals = async (req, res) => {
  const deals = await Deal.find()
    .populate("product")
    .sort({ createdAt: -1 });

  res.json(deals);
};

const addDeal = async (req, res) => {
  const { product, title, description, discountPercentage, isActive } = req.body;

  const deal = await Deal.create({
    product,
    title,
    description,
    discountPercentage,
    isActive,
  });

  req.io.emit("deal-changed");
  req.io.emit("product-changed");

  res.status(201).json(deal);
};

const updateDeal = async (req, res) => {
  const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("product");

  if (!deal) {
    return res.status(404).json({ message: "Deal not found" });
  }

  req.io.emit("deal-changed");
  req.io.emit("product-changed");

  res.json(deal);
};

const deleteDeal = async (req, res) => {
  const deal = await Deal.findById(req.params.id);

  if (!deal) {
    return res.status(404).json({ message: "Deal not found" });
  }

  await deal.deleteOne();

  req.io.emit("deal-changed");
  req.io.emit("product-changed");

  res.json({ message: "Deal deleted successfully" });
};

module.exports = {
  getDeals,
  addDeal,
  updateDeal,
  deleteDeal,
};