const Position = require('../models/Position');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const addProductAndShopDataToPosition = async positions => {
  // Здесь добавить информацию о товарах
  const productIds = positions.map(pos =>
    mongoose.Types.ObjectId(pos.productId),
  );
  const products = await Product.find({ _id: { $in: productIds } });
  // const products = await Product.find();
  console.log('============================');
  console.log('============================');
  console.log('============================');
  console.log('====================', products);
  console.log('============================');
  console.log('============================');
  console.log('============================');

  const respPositions = positions.toJSON();

  respPositions.forEach(item => {
    const foundProduct = products.find(
      prod => prod._id === item.productId,
    );
    console.log('>>>>>>', foundProduct);
    item.product = { test: 'pizda' };
  });
};

/**
 * CREATE NEW POSITION
 */
exports.create = async (req, res) => {
  /*
  !!!! TODO ОБЯЗАТЕЛЬНО проверять что такой позиции нет !!!!!
  И не вздумай этого не сделать!
   */
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
  const { productId } = req.query;
  const filter = {};
  if (productId) filter.productId = productId;

  const page = req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = limit * page;

  try {
    const count = await Position.count();
    const positions = await Position.find(filter)
      .skip(skip)
      .limit(limit);

    // if (positions && positions.length)
    //   await addProductAndShopDataToPosition(positions);

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
