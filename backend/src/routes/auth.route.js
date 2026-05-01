import express from "express";
import { signup, login, logout, profile, updateProfile, generateOTP, verifyOTP, generateLoginOTP, loginWithOTP } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, profile);
router.put("/update-profile", protectRoute, upload.single("profilePic"), updateProfile);

// OTP Verification Routes
router.post("/generateotp", generateOTP);
router.post("/verifyotp", verifyOTP);
router.post("/login-otp", generateLoginOTP);
router.post("/verify-login-otp", loginWithOTP);


export default router;
