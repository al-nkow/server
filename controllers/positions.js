const Position = require('../models/Position');
const mongoose = require('mongoose');

/**
 * CREATE NEW POSITION
 */
exports.create = async (req, res) => {
  const foundPosition = await Position.findOne({ ...req.body });
  if (foundPosition) {
    return res.status(409).json({ error: 'Position already exists' });
  }

  try {
    const newPosition = new Position({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });

    const created = await newPosition.save();
    res
      .status(201)
      .json({ message: 'Position created', id: created._id });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET ALL POSITIONS
 */
exports.getAll = async (req, res) => {
  const { productId, article } = req.query;
  const filter = {};
  if (productId) filter.productId = productId;
  if (article) filter.article = article;

  const page = req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = limit * page;

  try {
    const count = await Position.countDocuments();
    const positions = await Position.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ list: positions, count });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * DELETE POSITION
 */
exports.delete = async (req, res) => {
  try {
    const { positionId } = req.params;
    await Position.deleteOne({ _id: positionId });
    return res.status(200).json({ message: 'Position deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * UPDATE POSITION
 */
exports.update = async (req, res) => {
  const { positionId } = req.params;
  const updates = { ...req.body };

  try {
    await Position.findByIdAndUpdate(positionId, updates);
    res.status(200).json({ message: 'Position updated' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
