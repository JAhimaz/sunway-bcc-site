import express from "express";
import Company from "@/models/Company";
import Error from "@libs/error";
import Success from "@libs/success";

const UpdateCompanyRoute = express.Router();

UpdateCompanyRoute.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);


    if (!company) {
      return Error(res, 404, "COMPANY_NOT_FOUND", "Company not found");
    }

    const updatedCompany = await Company.findByIdAndUpdate(id, req.body.company, { new: true })

    return Success(res, 200, "COMPANY_UPDATED", "Company updated successfully", updatedCompany);
  } catch (error) {
    return Error(res, 500, "SERVER_ERROR", "Error updating company", error);
  }
})

export default UpdateCompanyRoute;