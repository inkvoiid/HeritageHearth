import { Router } from "express";
import authController from "../../controllers/authController.js";
const router = Router();

import loginLimiter from "../../middleware/loginLimiter.js";

router.route("/").post(loginLimiter, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

export default router;
