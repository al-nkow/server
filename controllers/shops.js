const mongoose = require('mongoose');
const Shop = require('../models/Shop');
const fs = require('fs');

const deleteImage = async foundShop => {
  if (foundShop && foundShop.image) {
    await fs.unlink('static' + foundShop.image, err => {
      if (err) console.log('DELETE SHOP IMAGE ERROR: ', err);
    });
  }
};

/**
 * CREATE NEW SHOP
 */
exports.create = async (req, res) => {
  const filename = req.file ? '/uploads/' + req.file.filename : '';
  try {
    const newShop = new Shop({
      ...req.body,
      image: filename,
      _id: new mongoose.Types.ObjectId(),
    });
    await newShop.save();
    res.status(201).json({ message: 'Shop created' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET ALL SHOPS
 */
exports.getAll = async (req, res) => {
  const filter = {};
  const shopIds = req.query.id;

  if (shopIds) {
    const ids = shopIds.map(item => mongoose.Types.ObjectId(item));
    filter._id = { $in: ids };
  }

  try {
    const shops = await Shop.find(filter).sort({ date: -1 }); // .select('title _id')
    res.status(200).json({ list: shops });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * DELETE SHOP
 */
exports.delete = async (req, res) => {
  try {
    const { shopId } = req.params;
    const foundShop = await Shop.findById(shopId);
    await Shop.deleteOne({ _id: shopId });
    await deleteImage(foundShop);
    return res.status(200).json({ message: 'Shop deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * UPDATE SHOP
 */
exports.update = async (req, res) => {
  const id = req.params.shopId;
  const updates = { ...req.body };
  const foundShop = await Shop.findById(id);

  // delete old image if there is a new one
  if (req.file && req.file.filename) {
    await deleteImage(foundShop);
    updates.image = '/uploads/' + req.file.filename;
  }
  // if user just delete image
  if (foundShop.image && !updates.image) {
    await deleteImage(foundShop);
  }

  try {
    await Shop.findByIdAndUpdate(id, updates);
    res.status(200).json({ message: 'Shop updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
