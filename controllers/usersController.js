import User from "../models/user.js";
import Recipe from "../models/recipe.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const { minimal } = req.query;
  var selectFields = {
    password: 0,
  };

  if (minimal === "true") {
    selectFields = {
      username: 1,
      profilePic: 1,
      firstName: 1,
      lastName: 1,
      roles: 1,
    };
  }

  User.find()
    .select(selectFields)
    .lean()
    .then(function (user) {
      // If the users collection doesn't contain users, send 400 response
      if (!user?.length) {
        return res.status(400).json({ message: "No users found" });
      }

      // Else, return the users collection
      res.json(user);
    })
    .catch((err) => {
      res.send("Error retrieving users");
    });
});

// Route for GET request to retrieve a user by id
const getUser = asyncHandler(async (req, res) => {
  const requestedUsername = req.params.username;

  // Convert the minimal query param to a boolean
  const minimal = req.query.minimal === "true";

  // Define selectFields based on the 'minimal' flag
  let selectFields = { password: 0 };

  if (minimal) {
    selectFields = {
      username: 1,
      profilePic: 1,
      firstName: 1,
      lastName: 1,
      roles: 1,
    };
  }

  try {
    const user = await User.findOne({ username: requestedUsername })
      .select(selectFields)
      .lean();

    // Only populate savedRecipes and recipes if minimal is false
    if (!minimal) {
      // Populate savedRecipes if they exist
      if (user && user.savedRecipes) {
        const populatedSavedRecipes = await Recipe.find({
          recipeId: { $in: user.savedRecipes },
        }).select(
          "recipeId name approved description recipeImage creator servingSize cookingTime"
        );

        // Assign the populated saved recipes to user.savedRecipes
        user.savedRecipes = populatedSavedRecipes;
      }

      // Populate user recipes if they exist
      if (user && user.recipes) {
        const populatedUserRecipes = await Recipe.find({
          recipeId: { $in: user.recipes },
        }).select(
          "recipeId name approved description recipeImage creator servingSize cookingTime"
        );

        // Assign the populated user recipes to user.recipes
        user.recipes = populatedUserRecipes;
      }
    }

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: `User ${requestedUsername} not found` });
    }
  } catch (err) {
    res.status(500).send("Error retrieving user: " + err.message);
  }
});

// Route for POST request to create a user

// @desc    Create a user
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    password,
    friends,
    savedRecipes,
    recipes,
    pantries,
    lists,
  } = req.body;

  // If any of the required fields are missing, send 400 response (bad request)
  if (!username || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Check if email already exists
  const duplicate = await User.findOne({ username: username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Username" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10); // salt rounds

  if (friends && Array.isArray(friends)) {
    user.friends = friends;
  }

  if (savedRecipes && Array.isArray(savedRecipes)) {
    user.savedRecipes = savedRecipes;
  }

  if (recipes && Array.isArray(recipes)) {
    user.recipes = recipes;
  }

  if (pantries && Array.isArray(pantries)) {
    user.pantries = pantries;
  }

  if (lists && Array.isArray(lists)) {
    user.lists = lists;
  }

  const userObject = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
    friends: req.friends,
    savedRecipes: req.savedRecipes,
    recipes: req.recipes,
    pantries: req.pantries,
    lists: req.lists,
  };
  const user = await User.create(userObject);

  if (user) {
    // If user is created successfully, send 201 response (created)
    res.status(201).json({
      message: `New user ${firstName} ${lastName} (${username}) created`,
    });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// Route for PUT request to update a user by id

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  // Get the id from the request parameters
  var requestedUsername = req.params.username;

  // Get the user data from the request body
  const {
    username,
    firstName,
    lastName,
    password,
    roles,
    profilePic,
    theme,
    friends,
    savedRecipes,
    recipes,
    pantries,
    lists,
  } = req.body;

  // If no id is included in the request parameters, use the id from the request body
  if (!req.params.username) {
    requestedUsername = username;
  }

  // If any of the required fields are missing, send 400 response (bad request)
  if (!requestedUsername || !firstName || !lastName || !username) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Doesn't use lean so that we can modify the user object, but does have exec to return a promise
  const user = await User.findOne({ username: requestedUsername }).exec();

  // If user doesn't exist, send 404 response (not found)
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ username: username }).lean().exec();
  // If duplicate email exists and it's not the same user, send 409 response (conflict)
  if (duplicate && duplicate.username !== requestedUsername) {
    return res.status(409).json({ message: "Duplicate Username" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;

  if (password) {
    // Hash password
    user.password = bcrypt.hashSync(password, 10); // salt rounds
  }

  if (roles && Array.isArray(roles)) {
    user.roles = roles;
  }

  if (profilePic) {
    user.profilePic = profilePic;
  }

  if (theme) {
    user.theme = theme;
  }

  if (friends && Array.isArray(friends)) {
    user.friends = friends;
  }

  if (savedRecipes && Array.isArray(savedRecipes)) {
    user.savedRecipes = savedRecipes;
  }

  if (recipes && Array.isArray(recipes)) {
    user.recipes = recipes;
  }

  if (pantries && Array.isArray(pantries)) {
    user.pantries = pantries;
  }

  if (lists && Array.isArray(lists)) {
    user.lists = lists;
  }

  if (req.params.username !== username) {
    await User.updateMany(
      { friends: { $elemMatch: { friendName: requestedUsername } } }, // Filter condition: users who have the requestedId as a friend
      { $set: { "friends.$.friendName": username } } // Update operation: remove the friend with friendId equal to requestedId
    );

    // Change the username in recipe creator for each recipe in recipes
    await Recipe.updateMany(
      { creator: requestedUsername },
      { $set: { creator: username } }
    );
  }

  const updatedUser = await user.save();

  res.status(200).json({
    message: `User ${updatedUser.firstName} ${updatedUser.lastName} (${updatedUser.username}) updated`,
  });
});

// Route for DELETE request to delete a user by id

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  // Get the id from the request parameters
  var requestedUsername = req.params.username;

  // Get the user data from the request body
  const { username, password } = req.body;

  // If no id is included in the request parameters, use the id from the request body
  if (!req.params.username) {
    requestedUsername = username;
  }

  // If any of the required fields are missing, send 400 response (bad request)
  if (!requestedUsername) {
    return res.status(400).json({ message: "Username required" });
  }

  const user = await User.findOne({ username: requestedUsername }).exec();

  // If user doesn't exist, send 404 response (not found)
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (password) {
    // Check if password is correct
    const passwordCorrect = await bcrypt.compare(password, user.password);

    // If password is incorrect, send 401 response (unauthorized)
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }
  }

  // Remove user from other users' friends array
  // TODO: Double Triple Check this works as intended
  await User.updateMany(
    { friends: { $elemMatch: { friendName: requestedUsername } } }, // Filter condition: users who have the requestedId as a friend
    { $pull: { friends: { friendName: requestedUsername } } } // Update operation: remove the friend with friendId equal to requestedId
  );

  // Delete user
  const result = await user.deleteOne();

  // Response message
  const reply = `User ${result.firstName} ${result.lastName} with ID ${result.username} deleted`;

  // Send response
  res.json(reply);
});

export default { getAllUsers, getUser, createUser, updateUser, deleteUser };
