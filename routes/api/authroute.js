import { Router } from "express";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import rateLimit from "express-rate-limit";
const router = Router();

// Import the user model schema from the models folder
import users from "../../models/user.js";

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
});


router.post("/", loginLimiter, async function (req, res) {
});

router.get("/refresh", function (req, res) {
});

router.post("/logout", async function (req, res) {
});

export default router;