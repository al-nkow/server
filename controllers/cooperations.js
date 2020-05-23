const Cooperation = require('../models/Cooperation');
const mongoose = require('mongoose');

/**
 * CREATE NEW COOPERATION
 */
exports.create = async (req, res) => {
  const { bocoArticle, email } = req.body;
  const foundCooperation = await Cooperation.findOne({ bocoArticle, email });

  if (foundCooperation)  await Cooperation.deleteOne({ bocoArticle });

  try {
    const newCooperation = new Cooperation({
      _id: new mongoose.Types.ObjectId(),
      expireAt: new Date(req.body.dateTo),
      ...req.body,
    });
    await newCooperation.save();

    /** TODO !!!!!
     * Здесь проверять на совпадение по количеству и отправлять письмо менеджеру если совпало!
     */

    res.status(200).json({ message: 'Cooperation created' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};