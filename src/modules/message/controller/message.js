import conversationModel from "../../../../DB/models/conversation.model.js";
import messageModel from "../../../../DB/models/message.model.js";
//import { getReceiverSocketId } from "../../../../index.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await conversationModel.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await conversationModel.create({
      participants: [senderId, receiverId],
    });
  }
  const newMessage = new messageModel({
    senderId,
    receiverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await Promise.all([newMessage.save(), conversation.save()]);

  // // SOCKET IO FUNCTIONALITY WILL GO HERE
  //   const receiverSocketId = getReceiverSocketId(receiverId);

  //   if (receiverSocketId) {
  // 	// io.to(<socket_id>).emit() used to send events to specific client
  // 	io.to(receiverSocketId).emit("newMessage", newMessage);
  // }

  return res.status(201).json({
    success: true,
    newMessage,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;
  const conversation = await conversationModel
    .findOne({
      participants: { $all: [senderId, userToChatId] },
    })
    .populate("messages");
  if (!conversation) {
    return res.status(200).json([]);
  }
  res.status(200).json({
    success: true,
    messages: conversation.messages,
  });
});
