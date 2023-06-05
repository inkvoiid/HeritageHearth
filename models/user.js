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
    "email": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
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
        type: String,
      },
    ],
    "recipes": [
      {
        type: String,
      },
    ],
    "pantries": [
      {
        type: String,
      },
    ],
    "lists": [
      {
        type: String,
      },
    ],
  },
  { collection: 'users', versionKey: false }
);

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

export default User;