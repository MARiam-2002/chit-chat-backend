// routes/auth.js
import { Router } from "express";
import * as messageController from "./controller/message.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
const router = Router();
router.post("/send/:id", isAuthenticated, messageController.sendMessage);
router.get("/:id", isAuthenticated, messageController.getMessages);

export default router;
