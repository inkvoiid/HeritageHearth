import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
const router = Router();

// Import the user model schema from the models folder
import users from "../../models/user.js";

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    message:
      "Too many login attempts from this IP, please try again after 15 minutes",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// @desc login
// @route POST /api/auth
// @access Public
router.post("/", loginLimiter, async function (req, res) {
  const { username, password } = req.body;

  // If any of the required fields are missing, send 400 response (bad request)
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Check if user exists
  const foundUser = await users.findOne({ username: username }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true, // Accessible only by the server
    // secure: true, // Only sent with HTTPS // Turned off for dev
    sameSite: "None", // Cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ accessToken: accessToken });
});

// @desc Refresh
// @route GET /api/auth/refresh
// @access Public - because access token has expired
router.get("/refresh", function (req, res) {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const foundUser = await users
        .findOne({ username: decoded.username })
        .exec();

      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorised" });
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      res.json({ accessToken: accessToken });
    }
  );
});

// @desc Logout
// @route POST /api/auth/logout
// @access Public - just to clear the cookie if it exists
router.post("/logout", async function (req, res) {
  const cookies = req.cookies;

  if (cookies.jwt) {
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });

    res.json({ message: "Cookie cleared" });
  } else {
    return res.status(204).send(); // No content
  }
});

export default router;
