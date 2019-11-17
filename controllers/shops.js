const mongoose = require('mongoose');
const Shop = require('../models/Shop');

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

// GET ALL SHOPS
exports.getAll = async (req, res) => {
  try {
    const shops = await Shop.find().sort({ date: -1 }); // .select('title _id')
    res.status(200).json({ list: shops });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// DELETE NEWS
// exports.news_delete = async (req, res) => {
//   try {
//     const foundNews = await News.findById(req.params.newsId);
//     await News.remove({ _id: req.params.newsId });
//     if (foundNews && foundNews.image) {
//       await fs.unlink('static' + foundNews.image, (err) => {
//         console.log('DELETE NEWS IMAGE ERROR: ', err);
//       });
//     }
//     return res.status(200).json({ message: 'News deleted' });
//   } catch (err) {
//     return res.status(500).json({ error: err });
//   }
// };

// UPDATE NEWS
// exports.news_update = async (req, res) => {
//   const id = req.params.newsId;
//   // delete old image if there is a new one
//   if (req.file && req.file.filename) {
//     const foundNews = await News.findById(id);
//     if (foundNews && foundNews.image) {
//       try {
//         await fs.unlink('static' + foundNews.image);
//       } catch (err) {
//         console.log('NEWS UPDATE - UNLINK ERROR', err);
//       }
//     }
//   }
//   const updates = {...req.body};
//   if (req.file && req.file.filename) updates.image = '/uploads/' + req.file.filename;
//   try {
//     await News.findByIdAndUpdate(id, updates);
//     res.status(200).json({ message: 'News updated' });
//   } catch (err) {
//     return res.status(500).json({ error: err });
//   }
// };
