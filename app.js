import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import helmet from "helmet";

import connectDB from "./config/dbConnect.js";

import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Import routes
import authRoutes from "./routes/api/authRoutes.js";
import userRoutes from "./routes/api/userRoutes.js";
import recipeRoutes from "./routes/api/recipeRoutes.js";
import pantryRoutes from "./routes/api/pantryRoutes.js";
import listRoutes from "./routes/api/listRoutes.js";

var app = express();

app.use(logger);

connectDB();

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(helmet());

// * Add new field to all existing recipes

// import Recipe from "./models/recipe.js";
// (async () => {
//   try {
//     // Fetch all recipes
//     const recipes = await Recipe.find({});

//     // Update each recipe by adding the new field
//     for (const recipe of recipes) {
//       recipe.approved = false; // Add the new field here
//       await recipe.save(); // Save the updated recipe
//     }

//     console.log("Migration complete.");
//   } catch (err) {
//     console.error("Migration failed:", err);
//   } finally {
//     mongoose.disconnect();
//   }
// })();

var port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/pantries", pantryRoutes);
app.use("/api/lists", listRoutes);

// Route for HOME
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Route for Error 404
app.all("*", function (req, res) {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully");
  // Start server
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
