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
    "items": [
        {
            "name": {type: String, required: true},
            "completed": {type: Boolean, required: true, default: false},
            "quantity": Number,
            "unit": String,
        }
    ],
    "userAccess": [
        {
            "userId": String,
        }
    ],
  },
  { collection: 'lists', versionKey: false }
);

// Create a model based on the schema
const List = mongoose.model('List', listSchema);

export default List;