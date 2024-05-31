import mongoose, { Schema, Types, model } from "mongoose";

const messageSchema = new Schema(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const messageModel =
  mongoose.models.messageModel || model("Message", messageSchema);
export default messageModel;
