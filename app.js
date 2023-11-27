import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Import routes
import authroute from "./routes/api/authroute.js";
import userroute from "./routes/api/userroute.js";
import reciperoute from "./routes/api/reciperoute.js";
import pantryroute from "./routes/api/pantryroute.js";
import listroute from "./routes/api/listroute.js";

var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(cors());

app.use(helmet());

var db = process.env.DB_CONNECTION_STRING;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error: " + err);
  });

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

app.use("/api/auth", authroute);
app.use("/api/users", userroute);
app.use("/api/recipes", reciperoute);
app.use("/api/pantries", pantryroute);
app.use("/api/lists", listroute);

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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
