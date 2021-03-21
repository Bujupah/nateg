const fs = require('fs')
const nodemailer = require("nodemailer");
const { resolve } = require("path");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: JSON.parse(process.env.SMTP_SECURE),
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
});

const sendWelcomeMail = async (user) => {
  const template = fs.readFileSync(resolve('template', 'welcome_template.html')).toString()
  let info = await transporter.sendMail({
    from: 'Nateg <foo@example.com>',
    to: user.email,
    subject: 'Welcome to nateg',
    html: interpolate(template, user),
  });
}

const interpolate = (template, data) => {
  return template.replace(/{([^{}]*)}/g, (a, b) => {
    var r = data[b];
    return typeof r === 'string' || typeof r === 'number' ? r : a;
  });
}

module.exports = { sendWelcomeMail }