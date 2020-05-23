const Supply = require('../models/Supply');
// const mongoose = require('mongoose');

/**
 * GET ALL SUPPLIES
 */
exports.getAll = async (req, res) => {
  try {
    const list = await Supply.find(req.query).sort({ date: -1 });
    res.status(200).json({ list });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};