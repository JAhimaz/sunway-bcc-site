import mongoose from "mongoose";
const Schema = mongoose.Schema

// This is an example Schema for a User model

const userSchema = new Schema({
  email: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  twitter: {
    type: String,
    required: false,
    default: "",
  },
  github: {
    type: String,
    required: false,
    default: "",
  },
  linkedin: {
    type: String,
    required: false,
    default: "",
  },
  instagram: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
  },
  exp: {
    type: Number,
    required: true,
    default: 0,
  },
  stamps: {
    type: Array,
    required: true,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  version: {
    type: Number,
    required: true,
    default: 0,
  }
}, { timestamps: true });

const User = mongoose.model("users", userSchema)
export default User;