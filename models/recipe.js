import mongoose from "mongoose";

const { Schema } = mongoose;

// Create a schema for the Recipe document structure
const recipeSchema = new Schema(
  {
    recipeId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    recipeImage: {
      type: String,
      default: "default-recipe-pic.png",
    },
    approved: {
      type: Boolean,
      default: false,
    },
    userLikes: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    forkedFrom: {
      type: String,
    },
    forkRecipeIds: [
      {
        type: String,
      },
    ],
    servingSize: {
      type: Number,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
      required: true,
    },
    instructions: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
      required: true,
    },
  },
  { timestamps: true, collection: "recipes", versionKey: false }
);

// Create a model based on the schema
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
