// Import the recipe model schema from the models folder
import Recipe from "../models/recipe.js";
import User from "../models/user.js";

import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import multer from "multer";
import slugify from "slugify";

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Private
const getAllRecipes = asyncHandler(async (req, res) => {
  Recipe.find()
    .sort({ name: "asc" })
    .select()
    .lean()
    .then(function (recipe) {
      // If the recipes collection doesn't contain recipes, send 400 response
      if (!recipe?.length) {
        return res.status(400).json({ message: "No recipes found" });
      }

      // Else, return the recipes collection
      res.json(recipe);
    })
    .catch((err) => {
      res.send("Error retrieving recipes");
    });
});

// ? Get recipe previews
// @desc    Get recipe previews
// @route   GET /api/recipes/previews
// @access  Private
const getAllRecipePreviews = asyncHandler(async (req, res) => {
  const { creator, showPending } = req.query;
  const query = {};

  if (creator) {
    query.creator = creator;
  }

  if (showPending === undefined || showPending === "false") {
    query.approved = true;
  }

  Recipe.find(query)
    .sort({ name: "asc" })
    .select({
      recipeId: 1,
      name: 1,
      approved: 1,
      description: 1,
      recipeImage: 1,
      creator: 1,
      servingSize: 1,
      cookingTime: 1,
    })
    .lean()
    .then(function (recipe) {
      // If the recipes collection doesn't contain recipes, send 400 response
      if (!recipe?.length) {
        return res.status(400).json({ message: "No recipes found" });
      }

      // Else, return the recipes collection
      res.json(recipe);
    })
    .catch((err) => {
      res.send("Error retrieving recipes");
    });
});

// ? Get pending recipes
// @desc    Get pending recipes
// @route   GET /api/recipes/pending
// @access  Private
const getAllPendingRecipes = asyncHandler(async (req, res) => {
  Recipe.find({ approved: false })
    .sort({ updatedAt: "desc" })
    .select({
      recipeId: 1,
      name: 1,
      approved: 1,
      description: 1,
      recipeImage: 1,
      creator: 1,
      servingSize: 1,
      cookingTime: 1,
      createdAt: 1,
      updatedAt: 1,
    })
    .lean()
    .then(function (recipe) {
      // If the recipes collection doesn't contain recipes, send 400 response
      if (!recipe?.length) {
        return res.status(400).json({ message: "No recipes found" });
      }

      // Else, return the recipes collection
      res.json(recipe);
    })
    .catch((err) => {
      res.send("Error retrieving recipes");
    });
});

// ? Get latest recipes
// @desc    Get latest recipes
// @route   GET /api/recipes/latest
// @access  Private
const getLatestRecipes = asyncHandler(async (req, res) => {
  const showPending = req.query.showPending === "true";

  const filter = showPending ? {} : { approved: true };

  Recipe.find(filter)
    .sort({ createdAt: "desc" })
    .limit(4)
    .select({
      recipeId: 1,
      name: 1,
      approved: 1,
      description: 1,
      recipeImage: 1,
      creator: 1,
      servingSize: 1,
      cookingTime: 1,
    })
    .lean()
    .then(function (recipe) {
      // If the recipes collection doesn't contain recipes, send 400 response
      if (!recipe?.length) {
        return res.status(400).json({ message: "No recipes found" });
      }

      // Else, return the recipes collection
      res.json(recipe);
    })
    .catch((err) => {
      res.send("Error retrieving recipes");
    });
});

// Route for GET request to retrieve a recipe by id

// @desc    Get a recipe
// @route   GET /api/recipes/:recipeId
const getRecipe = asyncHandler(async (req, res) => {
  var requestedId = req.params.recipeId;
  Recipe.findOne({ recipeId: requestedId })
    .select()
    .lean()
    .then(function (recipe) {
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json(`Error 404: Recipe ${requestedId} not found`);
      }
    })
    .catch((err) => {
      res.send("Error retrieving recipe ");
    });
});

// Route for POST request to create a recipe

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private
const createRecipe = asyncHandler(async (req, res) => {
  const {
    name,
    creator,
    recipeImage,
    approved,
    description,
    forkedFrom,
    forkRecipeIds,
    servingSize,
    cookingTime,
    ingredients,
    instructions,
  } = req.body;
  console.log(req.body);
  // If any of the required fields are missing, send 400 response (bad request)
  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!creator) missingFields.push("creator");
  if (!description) missingFields.push("description");
  if (!servingSize) missingFields.push("servingSize");
  if (!cookingTime) missingFields.push("cookingTime");
  if (!ingredients || !Array.isArray(ingredients) || !ingredients.length) {
    missingFields.push("ingredients");
  }
  if (!instructions || !Array.isArray(instructions) || !instructions.length) {
    missingFields.push("instructions");
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Please enter missing fields: ${missingFields.join(", ")}`,
    });
  }

  // Check if the creator exists
  const user = await User.findOne({ username: creator }).lean().exec();
  if (!user) {
    return res.status(400).json({ message: "Invalid username" });
  }

  // Check if recipe already exists
  const duplicate = await Recipe.findOne({
    creator: creator,
    ingredients: ingredients,
    instructions: instructions,
  })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate recipe" });
  }

  const recipeId = slugify(name + " by " + creator, { lower: true });

  const recipeImageFiles = recipeImage?._fileNames;

  const recipeObject = {
    recipeId: recipeId,
    name,
    creator,
    recipeImage: recipeImageFiles,
    approved,
    description,
    forkedFrom,
    forkRecipeIds,
    servingSize,
    cookingTime,
    ingredients,
    instructions,
  };
  const recipe = await Recipe.create(recipeObject);

  if (recipe) {
    // If recipe is created successfully, send 201 response (created)
    res.status(201).json({ message: `New recipe ${name} created` });
    // Add the recipe to the user's recipes array
    await User.updateOne(
      { username: creator },
      { $push: { recipes: recipeId } }
    ).exec();
  } else {
    res.status(400).json({ message: "Invalid recipe data received" });
  }
});

// Route for PUT request to update a recipe by id

// @desc    Update a recipe
// @route   PUT /api/recipe/:id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
  // Get the id from the request parameters
  var requestedId = req.params.recipeId;

  // Get the recipe data from the request body
  const {
    recipeId,
    name,
    creator,
    recipeImage,
    approved,
    userLikes,
    description,
    forkedFrom,
    forkRecipeIds,
    servingSize,
    cookingTime,
    ingredients,
    instructions,
    comments,
  } = req.body;

  // If no id is included in the request parameters, use the id from the request body
  if (!req.params.recipeId) {
    requestedId = recipeId;
  }

  // If any of the required fields are missing, send 400 response (bad request)
  const missingFields = [];

  if (!requestedId) {
    missingFields.push("recipeId");
  }
  if (!name) {
    missingFields.push("name");
  }
  if (!creator) {
    missingFields.push("creator");
  }
  if (!description) {
    missingFields.push("description");
  }
  if (!servingSize) {
    missingFields.push("servingSize");
  }
  if (!cookingTime) {
    missingFields.push("cookingTime");
  }
  if (!ingredients || !Array.isArray(ingredients) || !ingredients.length) {
    missingFields.push("ingredients");
  }
  if (!instructions || !Array.isArray(instructions) || !instructions.length) {
    missingFields.push("instructions");
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Please enter all fields: ${missingFields.join(", ")}`,
    });
  }

  // Doesn't use lean so that we can modify the recipe object, but does have exec to return a promise
  const recipe = await Recipe.findOne({ recipeId: requestedId }).exec();

  // If recipe doesn't exist, send 404 response (not found)
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const duplicate = await Recipe.findOne({
    creator: creator,
    ingredients: ingredients,
    instructions: instructions,
  })
    .lean()
    .exec();
  // If duplicate ingredients and instructions from the same creator exists and it's not the same recipe, send 409 response (conflict)
  if (duplicate && duplicate.recipeId !== requestedId) {
    return res
      .status(409)
      .json({ message: "Duplicate recipe content from the same user" });
  }

  const recipeImageFiles = recipeImage?._fileNames;

  recipe.name = name;
  recipe.creator = creator;
  recipe.recipeImage = recipeImageFiles;
  recipe.approved = approved;
  recipe.description = description;
  recipe.servingSize = servingSize;
  recipe.cookingTime = cookingTime;
  recipe.ingredients = ingredients;
  recipe.instructions = instructions;

  if (userLikes && Array.isArray(userLikes)) {
    recipe.userLikes = userLikes;
  }

  if (forkedFrom) {
    recipe.forkedFrom = forkedFrom;
  }

  if (forkRecipeIds && Array.isArray(forkRecipeIds)) {
    recipe.forkRecipeIds = forkRecipeIds;
  }

  if (comments && Array.isArray(comments)) {
    recipe.comments = comments;
  }

  const updatedRecipe = await recipe.save();

  res.status(200).json({ message: `Recipe ${updatedRecipe.name} updated` });
});

// Route for DELETE request to delete a recipe by id

// @desc    Delete a recipe
// @route   DELETE /api/recipe/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
  // Get the id from the request parameters
  var requestedId = req.params.recipeId;

  // Get the recipe data from the request body
  const { recipeId } = req.body;

  // If no id is included in the request parameters, use the id from the request body
  if (!req.params.recipeId) {
    requestedId = recipeId;
  }

  // If any of the required fields are missing, send 400 response (bad request)
  if (!requestedId) {
    return res.status(400).json({ message: "Recipe ID required" });
  }

  const recipe = await Recipe.findOne({ recipeId: requestedId }).exec();

  // If recipe doesn't exist, send 404 response (not found)
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  // Remove recipe from creator's recipe list
  await User.updateOne(
    { username: recipe.creator }, // Filter condition: find the creator by their _id
    { $pull: { recipes: requestedId } } // Update operation: remove the requestedId from recipes array
  );

  // Remove recipe from other users' saved recipe lists
  await User.updateMany(
    { savedRecipes: requestedId },
    { $pull: { savedRecipes: requestedId } }
  );

  // Remove recipe from forkedFrom recipe's forkRecipeIds list
  if (recipe.forkedFrom) {
    await Recipe.updateOne(
      { recipeId: recipe.forkedFrom }, // Filter condition: find the forkedFrom recipe by its _id
      { $pull: { forkRecipeIds: requestedId } } // Update operation: remove the requestedId from forkRecipeIds array
    );
  }

  // Delete recipe
  const result = await recipe.deleteOne();

  // Response message
  const reply = `Recipe ${result.name} with ID ${result.recipeId} deleted`;

  // Send response
  res.json(reply);
});

export default {
  getAllRecipes,
  getLatestRecipes,
  getAllPendingRecipes,
  getAllRecipePreviews,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
