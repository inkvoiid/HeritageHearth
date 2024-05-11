import rateLimit from "express-rate-limit";
import { logEvents } from "./logger.js";

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 log in requests per window per minute
  message: {
    message:
      "Too many login attempts from this IP, please try again after 15 minutes",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
