import { Router } from "express";
import mongoose from 'mongoose';
const router = Router();

// Import the pantry model schema from the models folder
import pantries from "../../models/pantry.js";
import users from "../../models/user.js";

// Route for GET request to retrieve all pantries

// @desc    Get all pantries
// @route   GET /api/pantries
// @access  Private
router.get("/", function (req, res) {
    pantries.find().select().lean()
        .then(function(pantry) {
            // If the pantries collection doesn't contain pantries, send 400 response
            if(!pantry?.length) {
                return res.status(400).json({message:"No pantries found"})
            }

            // Else, return the pantries collection
            res.json(pantry);
        })
        .catch(err => {
            res.send("Error retrieving pantries");
        });
});

// Route for GET request to retrieve a pantry by id
router.get("/:id?", function (req, res) {
    var requestedId = req.params.id;
    pantries.findById(requestedId).select().lean()
        .then(function(pantry) {
            if(pantry){
                res.json(pantry);
            } else{
                res.json(`Error 404: Pantry ${requestedId} not found`);
            }
        })
        .catch(err => {
            res.send("Error retrieving pantry ");
        });
});

// Route for POST request to create a pantry

// @desc    Create a pantry
// @route   POST /api/pantries
// @access  Private
router.post("/", async function (req, res) {

    const { name, items, userAccess } = req.body;

    // If any of the required fields are missing, send 400 response (bad request)
    if (!(name) || !(userAccess) || !Array.isArray(userAccess) || !userAccess.length) {
        return res.status(400).json({message:"Please enter all fields"});
    }
    
    // Check if all the users in userAccess exist
    for (const userID of userAccess) {
        const user = await users.findById(userID).lean().exec();
        if(!user){
            return res.status(400).json({message:`User ${userID} in userAccess does not exist`});
        }
    }

    // Duplicate pantries are allowed, so we don't need to check if the pantry already exists

    const id = new mongoose.Types.ObjectId().toString();
    const pantryObject = { _id: id, name, items, userAccess };
    const pantry = await pantries.create(pantryObject);

    if(pantry){ // If pantry is created successfully, send 201 response (created)
        // Add the pantry to the users' pantries
        for (const userID of userAccess) {
            await users.updateOne({_id: userID}, {$push: {pantries: id}}).exec();
        }
        res.status(201).json({message: `New pantry ${name} created`});
    }
    else{
        res.status(400).json({message: "Invalid pantry data received"})
    };
});

// Route for PUT request to update a pantry by id

// @desc    Update a pantry
// @route   PUT /api/pantry/:id
// @access  Private
router.put("/:id?", async function (req, res) {
    // Get the id from the request parameters
    var requestedId = req.params.id;

    // Get the pantry data from the request body
    const { _id, name, items, userAccess } = req.body;

    // If no id is included in the request parameters, use the id from the request body
    if(!req.params.id)
    {
        requestedId = _id;
    }

    // If any of the required fields are missing, send 400 response (bad request)
    if (!requestedId || !(name) || !(items) || !(userAccess) || !Array.isArray(items) || !Array.isArray(userAccess) || !userAccess.length) {
        return res.status(400).json({message:"Please enter all fields"});
    }

    // Doesn't use lean so that we can modify the pantry object, but does have exec to return a promise
    const pantry = await pantries.findById(requestedId).exec();

    // If pantry doesn't exist, send 404 response (not found)
    if(!pantry){
        return res.status(404).json({message:"Pantry not found"});
    }

    // Check if all the users in userAccess exist
    for (const userID of userAccess) {
        const user = await users.findById(userID).lean().exec();
        if(!user){
            return res.status(400).json({message:`User ${userID} in userAccess does not exist`});
        }
    }

    // Don't check for a duplicate pantry

    pantry.name = name;

    if(Array.isArray(items))
    {
        pantry.items = items;
    }

    if(Array.isArray(userAccess))
    {
        pantry.userAccess = userAccess;
    }

    const updatedPantry = await pantry.save();

    res.status(200).json({message: `Pantry ${updatedPantry.name} updated`});
});

// Route for DELETE request to delete a pantry by id

// @desc    Delete a pantry
// @route   DELETE /api/pantry/:id
// @access  Private
router.delete("/:id?", async function (req, res) {

    // Get the id from the request parameters
    var requestedId = req.params.id;

    // Get the pantry data from the request body
    const { _id } = req.body;

    // If no id is included in the request parameters, use the id from the request body
    if(!req.params.id)
    {
        requestedId = _id;
    }

    // If any of the required fields are missing, send 400 response (bad request)
    if (!requestedId) {
        return res.status(400).json({message:"Pantry ID required"});
    }

    const pantry = await pantries.findById(requestedId).exec();

    // If pantry doesn't exist, send 404 response (not found)
    if(!pantry){
        return res.status(404).json({message:"Pantry not found"});
    }

    // Remove pantry from users' pantry list
    await User.updateMany(
        { _id: { $in: pantry.userAccess } }, // Filter condition: find users with _id in userAccess array
        { $pull: { pantries: requestedId } } // Update operation: remove the requestedId from pantries array
    );

    // Delete pantry
    const result = await pantry.deleteOne();

    // Response message
    const reply = `Pantry ${result.name} with ID ${result._id} deleted`;

    // Send response
    res.json(reply);
});

export default router;