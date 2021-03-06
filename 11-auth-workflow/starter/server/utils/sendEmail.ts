// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
import nodemailerConfig from "./nodemailerConfig";

const sendEmail = async ({ to, subject, html }: any) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport(nodemailerConfig);

  let info = await transporter.sendMail({
    from: '"UJ" <hyj0829@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
};

export { sendEmail };
