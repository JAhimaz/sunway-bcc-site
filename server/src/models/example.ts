import mongoose from "mongoose";
const Schema = mongoose.Schema

// This is an example Schema for a User model

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  version: {
    type: Number,
    required: true,
    default: 0,
  }
}, { timestamps: true });

const User = mongoose.model("users", userSchema)
export default User;