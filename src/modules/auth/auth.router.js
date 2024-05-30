// routes/auth.js
import { Router } from 'express';
import * as authController from "./controller/auth.js";
const router=Router();

// @route    POST api/auth/send-otp

router.post('/send-otp',authController.sendOtp );

// @route    POST api/auth/verify-otp

router.post('/verify-otp',authController.verifyOtp);

export default router;
