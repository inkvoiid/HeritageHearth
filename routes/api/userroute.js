import { Router } from "express";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const router = Router();

// Import the user model schema from the models folder
import users from "../../models/user.js";

// Route for GET request to retrieve all users

// @desc    Get all users
// @route   GET /api/users
// @access  Private
router.get("/", function (req, res) {
    users.find().select("-password -email").lean()
        .then(function(user) {
            // If the users collection doesn't contain users, send 400 response
            if(!user?.length) {
                return res.status(400).json({message:"No users found"})
            }

            // Else, return the users collection
            res.json(user);
        })
        .catch(err => {
            res.send("Error retrieving users");
        });
});

// Route for GET request to retrieve a user by id
router.get("/:id?", function (req, res) {
    var requestedId = req.params.id;
    users.findById(requestedId).select("-password -email").lean()
        .then(function(user) {
            if(user){
                res.json(user);
            } else{
                res.json(`Error 404: User ${requestedId} not found`);
            }
        })
        .catch(err => {
            res.send("Error retrieving user ");
        });
});

// Route for POST request to create a user

// @desc    Create a user
// @route   POST /api/users
// @access  Private
router.post("/", async function (req, res) {

    const { firstName, lastName, email, password, friends, savedRecipes, recipes, pantries, lists } = req.body;

    // If any of the required fields are missing, send 400 response (bad request)
    if (!(email) || !(password) || !(firstName) || !(lastName)) {
        return res.status(400).json({message:"Please enter all fields"});
    }

    // Check if email already exists
    const duplicate = await users.findOne({ email: email }).lean().exec();
    if(duplicate){
        return res.status(409).json({message:"Duplicate Email"});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // salt rounds

    if(friends && Array.isArray(friends))
    {
        user.friends = friends;
    }

    if(savedRecipes && Array.isArray(savedRecipes))
    {
        user.savedRecipes = savedRecipes;
    }

    if(recipes && Array.isArray(recipes))
    {
        user.recipes = recipes;
    }

    if(pantries && Array.isArray(pantries))
    {
        user.pantries = pantries;
    }

    if(lists && Array.isArray(lists))
    {
        user.lists = lists;
    }

    const id = new mongoose.Types.ObjectId().toString();
    const userObject = { _id: id, firstName: firstName, lastName: lastName, email: email, password: hashedPassword, friends: req.friends, savedRecipes: req.savedRecipes, recipes: req.recipes, pantries: req.pantries, lists: req.lists };
    const user = await users.create(userObject);

    if(user){ // If user is created successfully, send 201 response (created)
        res.status(201).json({message: `New user ${firstName} ${lastName} created`});
    }
    else{
        res.status(400).json({message: "Invalid user data received"})
    };
});

// Route for PUT request to update a user by id

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
router.put("/:id?", async function (req, res) {
    // Get the id from the request parameters
    var requestedId = req.params.id;

    // Get the user data from the request body
    const { _id, firstName, lastName, email, password, friends, savedRecipes, recipes, pantries, lists } = req.body;

    // If no id is included in the request parameters, use the id from the request body
    if(!req.params.id)
    {
        requestedId = _id;
    }

    // If any of the required fields are missing, send 400 response (bad request)
    if (!requestedId || !firstName || !lastName || !email) {
        return res.status(400).json({message:"Please enter all fields"});
    }

    // Doesn't use lean so that we can modify the user object, but does have exec to return a promise
    const user = await users.findById(requestedId).exec();

    // If user doesn't exist, send 404 response (not found)
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    const duplicate = await users.findOne({ email: email }).lean().exec();
    // If duplicate email exists and it's not the same user, send 409 response (conflict)
    if(duplicate && duplicate._id !== requestedId){
        return res.status(409).json({message:"Duplicate Email"});
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    if(password)
    {
        // Hash password
        user.password = bcrypt.hashSync(password, 10); // salt rounds
    }

    if(friends && Array.isArray(friends))
    {
        user.friends = friends;
    }

    if(savedRecipes && Array.isArray(savedRecipes))
    {
        user.savedRecipes = savedRecipes;
    }

    if(recipes && Array.isArray(recipes))
    {
        user.recipes = recipes;
    }

    if(pantries && Array.isArray(pantries))
    {
        user.pantries = pantries;
    }

    if(lists && Array.isArray(lists))
    {
        user.lists = lists;
    }

    const updatedUser = await user.save();

    res.status(200).json({message: `User ${updatedUser.firstName} ${updatedUser.lastName} updated`});
});

// Route for DELETE request to delete a user by id

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
router.delete("/:id?", async function (req, res) {

    // Get the id from the request parameters
    var requestedId = req.params.id;

    // Get the user data from the request body
    const { _id } = req.body;

    // If no id is included in the request parameters, use the id from the request body
    if(!req.params.id)
    {
        requestedId = _id;
    }

    // If any of the required fields are missing, send 400 response (bad request)
    if (!requestedId) {
        return res.status(400).json({message:"User ID required"});
    }

    const user = await users.findById(requestedId).exec();

    // If user doesn't exist, send 404 response (not found)
    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    // Remove user from other users' friends array
    // TODO: Double Triple Check this works as intended
    await User.updateMany(
        { friends: { $elemMatch: { friendId: requestedId } } }, // Filter condition: users who have the requestedId as a friend
        { $pull: { friends: { friendId: requestedId } } } // Update operation: remove the friend with friendId equal to requestedId
    );
  

    // Delete user
    const result = await user.deleteOne();

    // Response message
    const reply = `User ${result.firstName} ${result.lastName} with ID ${result._id} deleted`;

    // Send response
    res.json(reply);
});

export default router;