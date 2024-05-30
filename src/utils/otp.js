// utils/otp.js
import twilio from "twilio";
import dotenv from "dotenv";
import { asyncHandler } from "./asyncHandler.js";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendOTP = async (phone) => {
  const service = await client.verify.services.create({
    friendlyName: "Chat App",
  });
  return client.verify
    .services(service.sid)
    .verifications.create({ to: phone, channel: "sms" });
};

export const verifyOTP = async (otpTime) => {
  try {
    const cDateTime = new Date();
    const differenceValue = (otpTime - cDateTime.getTime()) / 1000;
    differenceValue /= 60;
    const minutes = Math.abs(differenceValue);
    if (minutes > 2) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
};
