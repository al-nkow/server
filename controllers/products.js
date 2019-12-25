const Product = require('../models/Product');
const mongoose = require('mongoose');

/**
 * CREATE NEW PRODUCT
 */
exports.create = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });
    const created = await newProduct.save();
    res
      .status(201)
      .json({ message: 'Product created', id: created._id });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET PRODUCT BY ID
 */
exports.getById = async (req, res) => {
  try {
    const { productId } = req.params;
    const foundProduct = await Product.findById(productId);
    return res.status(200).json({ product: foundProduct });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET ALL PRODUCTS
 */
exports.getAll = async (req, res) => {
  const page = req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = limit * page;

  try {
    const count = await Product.count();
    const products = await Product.find()
      .skip(skip)
      .limit(limit);
    res.status(200).json({ list: products, count });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * DELETE PRODUCT
 */
exports.delete = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.deleteOne({ _id: productId });
    return res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * UPDATE PRODUCT
 */
exports.update = async (req, res) => {
  const { productId } = req.params;
  const updates = { ...req.body };

  try {
    await Product.findByIdAndUpdate(productId, updates);
    res.status(200).json({ message: 'Product updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
