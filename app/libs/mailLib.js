const nodemailer = require('nodemailer');

const logger = require('./loggerLib');

  let sendMailMethod = (to,subject,text) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vc16anvesh@gmail.com',
          pass: 'sehwag219' // naturally, replace both with your real credentials or an application-specific password
        }
      });
      
      const mailOptions = {
        from: 'vc16anvesh@gmail.com',
        to: to,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          logger.error(error);
        } else {
          logger.info('Email sent: ' + info);
        }
      });
    
  }

  module.exports = {

    
    sendMail: sendMailMethod
  };