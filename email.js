require("dotenv").config();
const nodeMailer = require("nodemailer");

const FROM = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASSWORD;
const TO = process.env.EMAIL_TO;

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: FROM,
    pass: PASSWORD,
  },
});

const mailOptions = {
  from: FROM,
  to: TO,
  subject: "Disponibilidad de productos",
  text: "Hay productos disponibles",
};

const sendEmail = async () => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };
