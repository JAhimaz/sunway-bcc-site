import mongoose from "mongoose";
const Schema = mongoose.Schema

const jobSchema = new Schema({
  companyId: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: false,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  // Make sure to check on the frontend if user is email / link to site / pdf
  jobUrl: {
    type: String,
    required: false,
  },
  minPay: {
    type: Number,
    required: false,
  },
  maxPay: {
    type: Number,
    required: false,
  },
  // Monthly, Yearly, Hourly, One-Time, Project-Based
  paymentSchedule: {
    type: String,
    required: true,
  },
  // USD, EUR, MYR, SGD, INR, RMB
  payCurrency: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: false,
  },
  isRemote: {
    type: Boolean,
    required: true,
    default: false,
  },
  // Full-Time, Part-Time, Contract, Internship, Freelance
  jobType: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
}, { timestamps: true });

const Job = mongoose.model("jobs", jobSchema)
export default Job;