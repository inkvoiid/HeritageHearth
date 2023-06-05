import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create a schema for the List document structure
const listSchema = new Schema(
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
            "completed": {type: Boolean, required: true, default: false},
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
  { timestamps: true, collection: 'lists', versionKey: false }
);

// Create a model based on the schema
const List = mongoose.model('List', listSchema);

export default List;