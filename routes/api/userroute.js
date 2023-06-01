import { Router } from "express";
import mongoose from 'mongoose';
const router = Router();

// Import the user model schema from the models folder
import users from "../../models/user.js";

// Route for GET request to retrieve all users
router.get("/", function (req, res) {
    users.find()
        .then(function(user) {
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
router.post("/", function (req, res) {
    req.body._id = new mongoose.Types.ObjectId().toString();
    users.create(req.body)
        .then(function(user) {
            res.json(user);
        })
        .catch(err => {
            res.send("Error creating user: "+err);
        });
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