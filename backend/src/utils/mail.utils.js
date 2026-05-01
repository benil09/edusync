import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "EduSync - Your OTP for Signup",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4CAF50; text-align: center;">EduSync Verification</h2>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) for completing your signup on EduSync is:</p>
          <div style="font-size: 24px; font-weight: bold; text-align: center; padding: 10px; background-color: #f9f9f9; border-radius: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP is valid for 5 minutes. Please do not share this with anyone.</p>
          <p>If you did not request this, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #888; text-align: center;">EduSync Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    // If SMTP fails, we still log the OTP for local development visibility
    console.log(`[DEVELOPMENT] OTP for ${email}: ${otp}`);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
