import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create a schema for the Pantry document structure
const pantrySchema = new Schema(
  {
    "_id": {
        type: String,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "items": {type: [
        {
            "name": {type: String, required: true},
            "category": String,
            "state": String,
            "quantity": Number,
            "unit": String,
        }
    ], default: []},
    "userAccess": {
        type: [
            {type: String, required: true}
        ],
        required: true
    }, 
  },
  { collection: 'pantries', versionKey: false }
);

// Create a model based on the schema
const Pantry = mongoose.model('Pantry', pantrySchema);

export default Pantry;