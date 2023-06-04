import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create a schema for the comment taht goes in a recipe, so that it can recursively be replied to
const commentSchema = new Schema({
    userId: String,
    content: String,
    userLikes: [
      {
        type: String
      }
    ],
    replies: [this] // Array of comments for nested replies
  });


// Create a schema for the Recipe document structure
const recipeSchema = new Schema(
  {
    "_id": {
        type: String,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "recipeImage": 
    {
        type: String,
        default: "default-recipe-pic.jpg"
    },
    "userLikes": [
        {
            type: String,
        }
    ],
    "description": {
        type: String,
        required: true
    },
    "forkedFrom": {
        type: String,
    },
    "forkRecipeIds": [
        {
            type: String,
        }
    ],
    "servingSize": {
        type: Number,
        required: true
    },
    "cookingTime":
    {
        "length": Number,
        "unit": String,
    },
    "ingredients": [
        {
            "name": String,
            "quantity": Number,
            "unit": String,
        }
    ],
    "instructions": [
        {
            type: String,
            required: true
        }
    ],
    "comments": [commentSchema]
  },
  {timestamps: true, collection: 'recipes', versionKey: false }
);

// Create a model based on the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;