import mongoose from "mongoose";
const Schema = mongoose.Schema

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  discord: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  headquarters: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Company = mongoose.model("companies", companySchema)
export default Company;