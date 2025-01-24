import mongoose from "mongoose";
const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Tag = mongoose.model("tags", tagSchema)
export default Tag;