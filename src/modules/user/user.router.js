// routes/auth.js
import { Router } from "express";
import * as userController from "./controller/user.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
const router = Router();
router.get("/", isAuthenticated,userController.getUsersForSidebar);

export default router;
