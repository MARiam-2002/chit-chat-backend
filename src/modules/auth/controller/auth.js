import tokenModel from "../../../../DB/models/Token.model.js";
import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import verifyOTP from "../../../utils/otp.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import twilio from "twilio";
import otpModel from "../../../../DB/models/otp.model.js";
import dotenv from "dotenv";

dotenv.config();

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
export const sendOtp = asyncHandler(async (req, res, next) => {
  const { phone } = req.body;
  const user = await userModel.findOne({ phone });
  if (!user) {
    await userModel.create({
      phone,
    });
  }

  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  await otpModel.findOneAndUpdate(
    {
      phone,
    },
    { otp, otpExpiration: new Date().getTime() },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
  // await client.messages.create({
  //   body: `Your OTP is ${otp}`,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: phone,
  // });

  res.status(200).json({
    msg: "OTP sent successfully" + " " + otp,
    success: true,
  });
});

export const verifyOtp = asyncHandler(async (req, res, next) => {
  const { phone, otp } = req.body;

  const user = await userModel.findOne({ phone });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const otpData = await otpModel.findOne({
    phone,
    otp,
  });
  if (!otpData) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }
  const otpIsExpired = await verifyOTP(otpData.otpExpiration);
  if (otpIsExpired) {
    return res.status(400).json({ msg: "OTP expired" });
  }
  const token = jwt.sign(
    { id: user._id, email: user.phone },
    process.env.TOKEN_KEY
  );

  await tokenModel.create({
    token,
    user: user._id,
    agent: req.headers["user-agent"],
  });
  res.status(200).json({
    success: true,
    result: token,
  });
});
