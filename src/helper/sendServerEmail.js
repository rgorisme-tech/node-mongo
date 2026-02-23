const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config');
const sendServerEmail = async (email, emailToken) => {
  try {
    // let verificationURL = `https://www.gdpc.io/verification?confirm=${emailToken}&email=${email}`;
    let verificationURL = `${config.host}/verification/${emailToken}/${email}`;

    // let html = `<a href=${verificationURL} target="_blank">Click Me</a>`;

    let html = `
    <div>
      <img src="https://i.postimg.cc/k5MPn2ZD/logo2x.png" width="392" height="80">
      <br />
      <br />
      <h4>Confirm Your E-Mail Address</h4>
      <br />
      <a href="${verificationURL}" target="_blank" style="background-color: green; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Verify Email</a>
    </div>
    `

    const transporter = nodemailer.createTransport(
      smtpTransport({
        host: 'live.smtp.mailtrap.io',
        port: '587',
        auth: {
          user: 'api',
          pass: '5cc3ba767c952d42a63abc361c3578c2'
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: true
        }
      })
    );

    const mailOptions = {
      from: 'mailtrap@cakeunited.com',
      to: email,
      subject: 'GDPC',
      html
    };
    console.log(mailOptions);
    const sendSMTPEmail = await transporter.sendMail(mailOptions);
    console.log('SMTP EMAil ', sendSMTPEmail);
  } catch (error) {}
};

module.exports = {
  sendServerEmail
};
