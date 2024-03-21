import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const tranporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export default tranporter;
