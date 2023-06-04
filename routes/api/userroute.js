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
            if(!user) {
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
    users.findById(requestedId)
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

    const { firstName, lastName, email, password } = req.body;

    // If any of the required fields are missing, send 400 response (bad request)
    if (!(email) || !(password) || !(firstName) || !(lastName)) {
        return res.status(400).json({message:"Please enter all fields"});
    }

    // Check if email already exists
    const duplicate = await users.findOne({ email: email }).lean();
    if(duplicate){
        return res.status(409).json({message:"Duplicate Email"});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // salt rounds

    const id = new mongoose.Types.ObjectId().toString();
    const userObject = { _id: id, firstName: firstName, lastName: lastName, email: email, password: hashedPassword };
    const user = await users.create(userObject);

    if(user){ // If user is created successfully, send 201 response (created)
        res.status(201).json({message: `New user ${firstName} ${lastName} created`});
    }
    else{
        res.status(400).json({message: "Invalid user data received"})
    };
});

// Route for PUT request to update a user by id
router.put("/:id?", function (req, res) {
    var requestedId = req.params.id;
    console.log(requestedId);
    users.findByIdAndUpdate(requestedId, req.body, { new: true })
        .then(function(user) {
            if(user){
                res.json(user);
            } else{
                res.json(`Error 404: User ${requestedId} not found`);
            }
        })
        .catch(err => {
            res.send("Error updating user: "+err);
        });
});

// Route for DELETE request to delete a user by id
router.delete("/:id?", function (req, res) {
    var requestedId = req.params.id;
    users.findByIdAndRemove(requestedId)
        .then(function(user) {
            if(user){
                res.json(user);
            } else{
                res.json(`Error 404: User ${requestedId} not found`);
            }
        })
        .catch(err => {
            res.send("Error deleting user: "+err);
        });
});

export default router;