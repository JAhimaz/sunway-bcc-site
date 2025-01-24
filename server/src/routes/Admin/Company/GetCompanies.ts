import express from "express";
import Company from "@/models/Company";
import Error from "@libs/error";
import Success from "@libs/success";

const GetCompaniesRoute = express.Router();

GetCompaniesRoute.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    return Success(res, 200, "COMPANIES_FETCHED", "Companies fetched successfully", companies);
  } catch (error) {
    return Error(res, 500, "SERVER_ERROR", "Error fetching companies", error);
  }
})

export default GetCompaniesRoute;