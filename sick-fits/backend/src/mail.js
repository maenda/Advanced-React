const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text) => `
  <div
    className="email"
    style="
      border 1px black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
    "
  >
    <h2>Hello There</h2>
    <p>${text}</p>
    <p>Maenda</p>
  </div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
