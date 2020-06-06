const MailService = require('../services/mail');

/**
 * SEND RENT EMAIL
 */
exports.create = async (req, res) => {
  const mailBody = getMailBody(req.body);
  const mailOptions = {
    subject: 'BOBERCO аренда ячейки',
    text: 'Поступила новая заявка на аренду ячейки',
    html: mailBody,
  };

  MailService.send(mailOptions).then(result => {
    console.log('Email sent: ', result);
    return res.status(200).json({ message: 'Application accepted' });
  }).catch(error => {
    console.log('MAIL SEND ERROR: ', error);
    return res.status(500).json({ error });
  })
};

/**
 * Get email message body
 */
function getMailBody(data) {
  const title = `<h3 style="padding: 10px; color: #ffffff; background: #30394a; border-left: 4px solid #ef7f1b;">
  Поступила заявка на аренду ячейки
  </h3>`;

  let body = `<div style="margin-bottom: 20px;">
    ${data.orgName ? data.orgName + '<br>' : ''}
    ${data.fizName ? data.fizName + '<br>' : ''}
    ${data.inn ? 'ИНН: ' + data.inn + '<br>' : ''}
    телефон: ${data.phone}<br>
    email: ${data.email}<br>
    ${data.mailOnly ? 'Получать сведения только по почте!<br>' : ''}
    ${data.comments ? 'Коментарии: ' + data.comments : ''}
  </div>`

  return `<div style="padding: 10px;">${title}${body}</div>`;
}