import nodemailer from "nodemailer";
import dotenv from "dotenv";
import env from "../config/env";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.gmail_user,
    pass: env.gmail_pass,
  },
});

interface SendMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async (
  email: string,
  subject: string,
  html: string
) => {
  const mailerOption: SendMailOptions = {
    from: "AroggoHub",
    to: email,
    subject,
    html,
  };

  return transporter.sendMail(mailerOption);
};
