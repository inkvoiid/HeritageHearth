import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc login
// @route POST /api/auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // If any of the required fields are missing, send 400 response (bad request)
  if (!username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Check if user exists
  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  const accessToken = jwt.sign(
    {
      username: foundUser.username,
      roles: foundUser.roles,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "120s" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true, // Accessible only by the server
    // secure: true, // Only sent with HTTPS // TODO: Reenable this for deployment
    sameSite: "None", // Cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ accessToken });
});

// @desc Refresh
// @route GET /api/auth/refresh
// @access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorised" });
      }

      const accessToken = jwt.sign(
        {
          username: foundUser.username,
          roles: foundUser.roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      res.json({ accessToken });
    })
  );
});

// @desc Logout
// @route POST /api/auth/logout
// @access Public - just to clear the cookie if it exists
const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(204).send(); // No content
  }
  //   TODO: Add secure: true back to this on deployment
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  res.json({ message: "Cookie cleared" });
});

export default {
  login,
  refresh,
  logout,
};
