const Wholesale = require('../models/Wholesale');
const mongoose = require('mongoose');

/**
 * CREATE NEW WHOLESALE OPTION
 */
exports.create = async (req, res) => {
  try {
    const newWholesale = new Wholesale({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });
    await newWholesale.save();
    res.status(200).json({ message: 'Wholesale option created' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET ALL WHOLESALE OPTIONS
 */
exports.getAll = async (req, res) => {
  try {
    const list = await Wholesale.find().sort({ date: -1 });
    res.status(200).json({ list });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * DELETE WHOLESALE OPTIONS
 */
exports.delete = async (req, res) => {
  try {
    const { wholesaleId } = req.params;
    await Wholesale.deleteOne({ _id: wholesaleId });
    return res.status(200).json({ message: 'Wholesale option deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * UPDATE WHOLESALE
 */
exports.update = async (req, res) => {
  const { wholesaleId } = req.params;
  const updates = { ...req.body };

  try {
    await Wholesale.findByIdAndUpdate(wholesaleId, updates);
    res.status(200).json({ message: 'Wholesale option updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};