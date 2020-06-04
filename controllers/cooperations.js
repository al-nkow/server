const Cooperation = require('../models/Cooperation');
const Product = require('../models/Product');
const Supply = require('../models/Supply');
const mongoose = require('mongoose');
const MailService = require('../services/mail');

/**
 * DELETE COOPERATION
 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Cooperation.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Cooperation deleted' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

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

    notifyIfPossible(bocoArticle);
    
    res.status(200).json({ message: 'Cooperation created' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * GET ALL COOPERATIONS
 */
exports.getAll = async (req, res) => {  
  try {
    const list = await Cooperation.find(req.query).sort({ date: -1 });
    res.status(200).json({ list });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * Send email to manager if cooperation is possible
 */
async function notifyIfPossible(bocoArticle) {
  try {
    const allCooperations = await Cooperation.find({ bocoArticle });
    const foundProduct = await Product.findOne({ bocoArticle });
    const productId = foundProduct._id;
    const foundSupply = await Supply.findOne({ productId: productId });
    const supplies = foundSupply.options;
    const quantities = supplies.map(item => item.quantity);
    const minCooperationAmount = Math.min.apply(null, quantities);
    const coopAmount = allCooperations.reduce((res, item) => {
      return res + +item.amount;
    }, 0);
    const cooperationIsPossible = coopAmount >= minCooperationAmount;
  
    if (cooperationIsPossible) {
      const mailBody = getMailBody(foundProduct.name, productId, allCooperations);
  
      if (cooperationIsPossible) {
        MailService.send({
          from: '"BOBERCO INFO" <bobercoru@gmail.com>',
          to: 'al.nkow@gmail.com',
          subject: 'BOBERCO кооперация',
          text: 'Поступила новая заявка на кооперацию' + productId,
          html: mailBody,
        });
      }
    }
  } catch(e) {
    console.log('COOPERATION NOTIFY ERROR', e);
  }
}

/**
 * Get email message body
 */
function getMailBody(productName, productId, cooperations) {
  const title = `<h3 style="padding: 10px; color: #ffffff; background: #30394a; border-left: 4px solid #ef7f1b;">
  Поступила заявка на кооперацию
  </h3>`;
  const prodInfo = `<h3 style="margin-bottom: 20px; font-size: 20px;">${productName}</h3>`;
  const link = `<div>
  <a style="display: inline-block; color: #ffffff; margin-top: 20px; padding: 10px 20px; background: #008cd2; border-radius: 4px;"
  href="http://boberco.ru/admin/products/${productId}">
  Перейти в карточку товара
  </a>
  </div>`

  let body = '';
  cooperations.forEach(coop => {
    body += `<div style="margin-bottom: 20px;">
    ${coop.orgName || coop.fizName}<br>
    <b>${coop.amount}</b> до <b>${coop.dateTo}</b><br>
    телефон: ${coop.phone}<br>
    email: ${coop.email}
    </div>`
  });
  return `<div style="padding: 10px;">${title}${prodInfo}${body}${link}</div>`;
}