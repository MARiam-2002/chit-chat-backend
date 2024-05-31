import userModel from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const getUsersForSidebar = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user._id;

  const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } });
  return res.status(200).json(filteredUsers);
});
