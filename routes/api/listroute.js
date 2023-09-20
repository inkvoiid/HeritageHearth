import { Router } from "express";
import mongoose from "mongoose";
import verifyJWT from "../../middleware/verifyJWT.js";
const router = Router();

// Import the list model schema from the models folder
import lists from "../../models/list.js";
import users from "../../models/user.js";

// router.use(verifyJWT); // disabled as i didn't get JWTs working

// Route for GET request to retrieve all lists

// @desc    Get all lists
// @route   GET /api/lists
// @access  Private
router.get("/", function (req, res) {
  lists
    .find()
    .select()
    .lean()
    .then(function (list) {
      // If the lists collection doesn't contain lists, send 400 response
      if (!list?.length) {
        return res.status(400).json({ message: "No lists found" });
      }

      // Else, return the lists collection
      res.json(list);
    })
    .catch((err) => {
      res.send("Error retrieving lists");
    });
});

// Route for GET request to retrieve a list by id
router.get("/:id?", function (req, res) {
  var requestedId = req.params.id;
  lists
    .findById(requestedId)
    .select()
    .lean()
    .then(function (list) {
      if (list) {
        res.json(list);
      } else {
        res.status(404).json(`Error 404: List ${requestedId} not found`);
      }
    })
    .catch((err) => {
      res.send("Error retrieving list ");
    });
});

// Route for POST request to create a list

// @desc    Create a list
// @route   POST /api/lists
// @access  Private
router.post("/", async function (req, res) {
  const { name, items, userAccess } = req.body;

  // If any of the required fields are missing, send 400 response (bad request)
  if (
    !name ||
    !userAccess ||
    !Array.isArray(userAccess) ||
    !userAccess.length
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Check if all the users in userAccess exist
  for (const userID of userAccess) {
    const user = await users.findOne({ username: userID }).lean().exec();
    if (!user) {
      return res
        .status(400)
        .json({ message: `User ${userID} in userAccess does not exist` });
    }
  }

  // Duplicate lists are allowed, so we don't need to check if the list already exists

  const id = new mongoose.Types.ObjectId().toString();
  const listObject = { _id: id, name, items, userAccess };
  const list = await lists.create(listObject);

  if (list) {
    // If list is created successfully, send 201 response (created)
    // Add the pantry to the users' pantries
    for (const userID of userAccess) {
      await users
        .updateOne({ username: userID }, { $push: { lists: id } })
        .exec();
    }
    res.status(201).json({ message: `New list ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid list data received" });
  }
});

// Route for PUT request to update a list by id

// @desc    Update a list
// @route   PUT /api/list/:id
// @access  Private
router.put("/:id?", async function (req, res) {
  // Get the id from the request parameters
  var requestedId = req.params.id;

  // Get the list data from the request body
  const { _id, name, items, userAccess } = req.body;

  // If no id is included in the request parameters, use the id from the request body
  if (!req.params.id) {
    requestedId = _id;
  }

  // If any of the required fields are missing, send 400 response (bad request)
  if (
    !requestedId ||
    !name ||
    !items ||
    !userAccess ||
    !Array.isArray(items) ||
    !Array.isArray(userAccess) ||
    !userAccess.length
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Doesn't use lean so that we can modify the list object, but does have exec to return a promise
  const list = await lists.findById(requestedId).exec();

  // If list doesn't exist, send 404 response (not found)
  if (!list) {
    return res.status(404).json({ message: "List not found" });
  }

  // Check if all the users in userAccess exist
  for (const userID of userAccess) {
    const user = await users.findOne({ username: userID }).lean().exec();
    if (!user) {
      return res
        .status(400)
        .json({ message: `User ${userID} in userAccess does not exist` });
    }
  }

  // Don't check for a duplicate pantry

  list.name = name;

  if (Array.isArray(items)) {
    list.items = items;
  }

  if (Array.isArray(userAccess)) {
    list.userAccess = userAccess;
  }

  const updatedList = await list.save();

  res.status(200).json({ message: `List ${updatedList.name} updated` });
});

// Route for DELETE request to delete a list by id

// @desc    Delete a list
// @route   DELETE /api/list/:id
// @access  Private
router.delete("/:id?", async function (req, res) {
  // Get the id from the request parameters
  var requestedId = req.params.id;

  // Get the list data from the request body
  const { _id } = req.body;

  // If no id is included in the request parameters, use the id from the request body
  if (!req.params.id) {
    requestedId = _id;
  }

  // If any of the required fields are missing, send 400 response (bad request)
  if (!requestedId) {
    return res.status(400).json({ message: "List ID required" });
  }

  const list = await lists.findById(requestedId).exec();

  // If list doesn't exist, send 404 response (not found)
  if (!list) {
    return res.status(404).json({ message: "List not found" });
  }

  // Remove pantry from users' list of shopping lists
  await users.updateMany(
    { username: { $in: list.userAccess } }, // Filter condition: find users with _id in userAccess array
    { $pull: { lists: requestedId } } // Update operation: remove the requestedId from pantries array
  );

  // Delete list
  const result = await list.deleteOne();

  // Response message
  const reply = `List ${result.name} with ID ${result._id} deleted`;

  // Send response
  res.json(reply);
});

export default router;
