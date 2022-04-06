const nodemailer = require("nodemailer");

const sendEmail = async () => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "duncan.ernser33@ethereal.email",
      pass: "4BgQpgMSPBBDgCSqAa",
    },
  });
  let info = await transporter.sendMail({
    from: '"UJ" <hyj0829@gmail.com>', // sender address
    to: "user@user.com", // list of receivers
    subject: "Hello world", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};

module.exports = sendEmail;
