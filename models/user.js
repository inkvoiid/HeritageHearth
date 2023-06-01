import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create a schema for the User document structure
const userSchema = new Schema(
  {
    "_id": {
        type: String,
        required: true
    },
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "profilePic": 
    {
        type: String,
        default: "default-profile-pic.jpg"
    },
    "friends": [
      {
        "_id": false,
        "friendId": String,
        "relation": String,
      },
    ],
    "savedRecipes": [
      {
        "recipeId": Number,
      },
    ],
    "recipes": [
      {
        "recipeId": Number,
      },
    ],
    "pantries": [
      {
        "pantryId": Number,
      },
    ],
    "lists": [
      {
        "listId": Number,
      },
    ],
  },
  { collection: 'users', versionKey: false }
);

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

export default User;