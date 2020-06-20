const Category = require('../models/Category');
const mongoose = require('mongoose');
const fs = require('fs');

const deleteImage = async foundCategory => {
  if (foundCategory && foundCategory.image) {
    await fs.unlink('static' + foundCategory.image, err => {
      if (err) console.log('DELETE CATEGORY IMAGE ERROR: ', err);
    });
  }
};

/**
 * CREATE NEW CATEGORY
 */
exports.create = async (req, res) => {
  const data = { ...req.body };

  if (req.file && req.file.filename) {
    data.image = '/uploads/' + req.file.filename;
  }

  try {
    const newCategory = new Category({
      ...data,
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
    const foundCAtegory  = await Category.findById(categoryId);
    await Category.deleteOne({ _id: categoryId });
    await deleteImage(foundCAtegory);
    return res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * UPDATE CATEGORY
 */
exports.update = async (req, res) => {
  const id = req.params.categoryId;
  const updates = { ...req.body };
  const foundCategory = await Category.findById(id);

  // delete old image if there is a new one
  if (req.file && req.file.filename) {
    await deleteImage(foundCategory);
    updates.image = '/uploads/' + req.file.filename;
  }

  // if category just delete image
  if (foundCategory.image && !updates.image) {
    await deleteImage(foundCategory);
    updates.image = '';
  }

  try {
    await Category.findByIdAndUpdate(id, updates);
    res.status(200).json({ message: 'Category updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
