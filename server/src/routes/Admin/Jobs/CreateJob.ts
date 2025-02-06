import express from "express";
import Job from "@/models/Job";
import Error from "@libs/error";
import Success from "@libs/success";

const CreateJobRoute = express.Router();

CreateJobRoute.post("/", async (req, res) => {
  const { job } = req.body;
  const { companyId, jobTitle, jobDescription, jobUrl, minPay, maxPay, paymentSchedule, payCurrency, location, timezone, isRemote, jobType, skill, tags } = job;

  if (!jobTitle || !jobDescription || !jobUrl || !location || !jobType || !skill) {
    return Error(res, 400, "INCOMPLETE_DATA", "Please provide all required data", {
      companyId: companyId ? "Valid" : "Missing",
      jobTitle: jobTitle ? "Valid" : "Missing",
      jobDescription: jobDescription ? "Valid" : "Missing",
      jobUrl: jobUrl ? "Valid" : "Missing",
      location: location ? "Valid" : "Missing",
      isRemote: isRemote ? "Valid" : "Missing",
      jobType: jobType ? "Valid" : "Missing",
      skill: skill ? "Valid" : "Missing"
    });
  }

  const newJob = new Job({
    companyId,
    jobTitle,
    jobDescription,
    jobUrl,
    minPay,
    maxPay,
    paymentSchedule,
    payCurrency,
    location,
    timezone,
    isRemote,
    jobType,
    skill,
    tags
  });

  try {
    await newJob.save();
    return Success(res, 200, "JOB_CREATED", "Job created successfully", newJob);
  } catch (error) {
    return Error(res, 500, "SERVER_ERROR", "Error creating job", error);
  }
  
})

export default CreateJobRoute;