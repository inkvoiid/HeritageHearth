import { Router } from "express";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const router = Router();

// Import the recipe model schema from the models folder
import recipes from "../../models/recipe.js";

// Route for GET request to retrieve all recipes

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Private
router.get("/", function (req, res) {
    recipes.find().select().lean()
        .then(function(recipe) {
            // If the recipes collection doesn't contain recipes, send 400 response
            if(!recipe?.length) {
                return res.status(400).json({message:"No recipes found"})
            }

            // Else, return the recipes collection
            res.json(recipe);
        })
        .catch(err => {
            res.send("Error retrieving recipes");
        });
});

// Route for GET request to retrieve a recipe by id
router.get("/:id?", function (req, res) {
    var requestedId = req.params.id;
    recipes.findById(requestedId).select().lean()
        .then(function(recipe) {
            if(recipe){
                res.json(recipe);
            } else{
                res.json(`Error 404: Recipe ${requestedId} not found`);
            }
        })
        .catch(err => {
            res.send("Error retrieving recipe ");
        });
});

// Route for POST request to create a recipe

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private
router.post("/", async function (req, res) {

    const { name, creator, recipeImage, description, forkedFrom, forkRecipeIds, servingSize, cookingTime, ingredients, instructions } = req.body;

    // If any of the required fields are missing, send 400 response (bad request)
    if (!(name) || !(creator) || !(recipeImage) || !(description) || !(servingSize) || !(cookingTime) || !(ingredients) || !(instructions) || !Array.isArray(ingredients) || !Array.isArray(instructions) || !ingredients.length || !instructions.length) {
        return res.status(400).json({message:"Please enter all fields"});
    }
    // Check if recipe already exists
    const duplicate = await recipes.findOne({ 
        creator: creator,
        ingredients: ingredients, 
        instructions: instructions,
    }).lean().exec();

    if(duplicate){
        return res.status(409).json({message:"Duplicate recipe"});
    }

    const id = new mongoose.Types.ObjectId().toString();
    const recipeObject = { _id: id, name, creator, recipeImage, description, forkedFrom, forkRecipeIds, servingSize, cookingTime, ingredients, instructions };
    const recipe = await users.create(recipeObject);

    if(recipe){ // If recipe is created successfully, send 201 response (created)
        res.status(201).json({message: `New recipe ${name} created`});
    }
    else{
        res.status(400).json({message: "Invalid recipe data received"})
    };
});

// Route for PUT request to update a recipe by id

// @desc    Update a recipe
// @route   PUT /api/recipe/:id
// @access  Private
router.put("/:id?", async function (req, res) {
    // Get the id from the request parameters
    var requestedId = req.params.id;

    // Get the recipe data from the request body
    const { _id, name, creator, recipeImage, userLikes, description, forkedFrom, forkRecipeIds, servingSize, cookingTime, ingredients, instructions, comments } = req.body;

    // If no id is included in the request parameters, use the id from the request body
    if(!req.params.id)
    {
        requestedId = _id;
    }

    // If any of the required fields are missing, send 400 response (bad request)
    if (!requestedId || !(name) || !(creator) || !(recipeImage) || !(description) || !(servingSize) || !(cookingTime) || !(ingredients) || !(instructions) || !Array.isArray(ingredients) || !Array.isArray(instructions) || !ingredients.length || !instructions.length) {
        return res.status(400).json({message:"Please enter all fields"});
    }

    // Doesn't use lean so that we can modify the recipe object, but does have exec to return a promise
    const recipe = await recipes.findById(requestedId).exec();

    // If recipe doesn't exist, send 404 response (not found)
    if(!recipe){
        return res.status(404).json({message:"Recipe not found"});
    }

    const duplicate = await users.findOne({ 
        creator: creator,
        ingredients: ingredients, 
        instructions: instructions }).lean().exec();
    // If duplicate ingredients and instructions from the same creator exists and it's not the same recipe, send 409 response (conflict)
    if(duplicate && duplicate._id !== requestedId){
        return res.status(409).json({message:"Duplicate recipe content from the same user"});
    }

    recipe.name = name;
    recipe.creator = creator;
    recipe.recipeImage = recipeImage;
    recipe.description = description;
    recipe.servingSize = servingSize;
    recipe.cookingTime = cookingTime;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;


    if(userLikes && Array.isArray(userLikes))
    {
        recipe.userLikes = userLikes;
    }

    if(forkedFrom)
    {
        recipe.forkedFrom = forkedFrom;
    }

    if(forkRecipeIds && Array.isArray(forkRecipeIds))
    {
        recipe.forkRecipeIds = forkRecipeIds;
    }

    if(comments && Array.isArray(comments))
    {
        recipe.comments = comments;
    }

    const updatedRecipe = await recipe.save();

    res.status(200).json({message: `Recipe ${updatedRecipe.name} updated`});
});

// Route for DELETE request to delete a recipe by id

// @desc    Delete a recipe
// @route   DELETE /api/recipe/:id
// @access  Private
router.delete("/:id?", async function (req, res) {

    // Get the id from the request parameters
    var requestedId = req.params.id;

    // Get the recipe data from the request body
    const { _id } = req.body;

    // If no id is included in the request parameters, use the id from the request body
    if(!req.params.id)
    {
        requestedId = _id;
    }

    // If any of the required fields are missing, send 400 response (bad request)
    if (!requestedId) {
        return res.status(400).json({message:"Recipe ID required"});
    }

    const recipe = await recipes.findById(requestedId).exec();

    // If recipe doesn't exist, send 404 response (not found)
    if(!recipe){
        return res.status(404).json({message:"Recipe not found"});
    }

    // Remove recipe from creator's recipe list
    await User.updateOne(
        { _id: recipe.creator }, // Filter condition: find the creator by their _id
        { $pull: { recipes: requestedId } } // Update operation: remove the requestedId from recipes array
    );
  

    // Remove recipe from other users' saved recipe lists
    await users.updateMany({ savedRecipes: requestedId }, { $pull: { savedRecipes: requestedId } });

    // Remove recipe from forkedFrom recipe's forkRecipeIds list
    if (recipe.forkedFrom) {
        await Recipe.updateOne(
        { _id: recipe.forkedFrom }, // Filter condition: find the forkedFrom recipe by its _id
        { $pull: { forkRecipeIds: requestedId } } // Update operation: remove the requestedId from forkRecipeIds array
        );
    }

    // Delete recipe
    const result = await recipe.deleteOne();

    // Response message
    const reply = `Recipe ${result.name} with ID ${result._id} deleted`;

    // Send response
    res.json(reply);
});

export default router;