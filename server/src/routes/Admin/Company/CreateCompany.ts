import express from "express";
import Company from "@/models/Company";
import Error from "@libs/error";
import Success from "@libs/success";

const CreateCompanyRoute = express.Router();

CreateCompanyRoute.post("/", async (req, res) => {
  const { company } = req.body;
  const { name, logo, website, description, headquarters, twitter, discord, instagram, linkedin, github } = company;

  if (!name || !website || !description) {
    return Error(res, 400, "INCOMPLETE_DATA", "Please provide all required data", {
      name: name ? "Valid" : "Missing",
      website: website ? "Valid" : "Missing",
      description: description ? "Valid" : "Missing"
    });
  }

  // Check if company already exists
  const companyExists = await Company
    .findOne({ name }).then((company) => company ? true : false)
  
  if (companyExists) {
    return Error(res, 400, "COMPANY_EXISTS", "Company already exists");
  }

  const newCompany = new Company({
    name,
    logo,
    twitter,
    linkedin,
    instagram,
    github,
    discord,
    website,
    description,
    headquarters
  });

  try {
    await newCompany.save();
    return Success(res, 200, "COMPANY_CREATED", "Company created successfully", newCompany);
  } catch (error) {
    return Error(res, 500, "SERVER_ERROR", "Error creating company", error);
  }
  
})

export default CreateCompanyRoute;