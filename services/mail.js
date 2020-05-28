const config = require('config');
const nodemailer = require('nodemailer');

const MAIL_USER = config.get('mailUser');
const MAIL_PASSWORD = config.get('mailPassword');
const MAIL_SERVICE = config.get('mailService');

const transporter = nodemailer.createTransport({
  service: MAIL_SERVICE,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

exports.send = mailOptions => {
  // const mailOptions = {
  //   from: '"BOBER сайт" <bobercoru@gmail.com>',
  //   to: 'al.nkow@gmail.com',
  //   subject: 'BOBERCO кооперация',
  //   text: 'Поступила новая заявка на кооперацию',
  //   html: '<h1>Кооперация ебанэврот</h1>'
  // };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('ERROR SEND MAIL:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}