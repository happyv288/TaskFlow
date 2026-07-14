import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("✅ SMTP Ready");
  }
});

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailOptions) => {
  await transporter.sendMail({
    from: `"TaskFlow" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
