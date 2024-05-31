import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import userModel from "../../DB/models/user.model.js";
import tokenModel from "../../DB/models/Token.model.js";
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token = req.headers["token"];

  if (!token) {
    return next(new Error("valid token is required"));
  }

  const decode = jwt.verify(token, process.env.TOKEN_KEY);
  if (!decode) {
    return next(new Error("Invalid-token"));
  }

  const tokenDB = await tokenModel.findOne({ token, isValid: true });

  if (!tokenDB) {
    return next(new Error("Token expired!"));
  }

  const user = await userModel.findOne({ phone: decode.phone });

  if (!user) {
    return next(new Error("user not found!"));
  }

  req.user = user;
  return next();
});
