const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

const addProduct = async (req, res) => {
  const { name, price, description, category, stockQuantity } = req.body;

  const product = await Product.create({
    image: req.file ? `/uploads/${req.file.filename}` : "",
    name,
    price,
    description,
    category,
    stockQuantity,
    availabilityStatus: Number(stockQuantity) > 0 ? "Available" : "Out of Stock",
  });

  req.io.emit("product-changed");
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { name, price, description, category, stockQuantity } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.category = category || product.category;
  product.stockQuantity =
    stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
  product.availabilityStatus =
    Number(product.stockQuantity) > 0 ? "Available" : "Out of Stock";

  if (req.file) {
    product.image = `/uploads/${req.file.filename}`;
  }

  const updatedProduct = await product.save();

  req.io.emit("product-changed");
  res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();

  req.io.emit("product-changed");
  res.json({ message: "Product deleted successfully" });
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};