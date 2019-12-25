const Category = require('../models/Category');
const mongoose = require('mongoose');

/**
 * CREATE NEW CATEGORY
 */
exports.create = async (req, res) => {
  try {
    const newCategory = new Category({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });
    await newCategory.save();
    res.status(201).json({ message: 'Category created' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET ALL CATEGORIES
 */
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find().sort({ date: -1 });
    res.status(200).json({ list: categories });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET CATEGORY BY ID
 */
exports.getById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const foundCategory = await Category.findById(categoryId);
    return res.status(200).json({ category: foundCategory });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * DELETE CATEGORY
 */
exports.delete = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Category.deleteOne({ _id: categoryId });
    return res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * UPDATE CATEGORY
 */
exports.update = async (req, res) => {
  const { categoryId } = req.params;
  const updates = { ...req.body };

  try {
    await Category.findByIdAndUpdate(categoryId, updates);
    res.status(200).json({ message: 'Category updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
