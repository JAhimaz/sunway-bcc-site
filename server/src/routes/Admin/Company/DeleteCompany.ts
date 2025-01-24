import express from "express";
import Company from "@/models/Company";
import Error from "@libs/error";
import Success from "@libs/success";

const DeleteCompanyRoute = express.Router();

DeleteCompanyRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Company.findByIdAndDelete(id);
    Success(res, 200, "DELETED_COMPANY", "Company has been deleted successfully.");
  } catch (error) {
    Error(res, 400, "DELETE_COMPANY_ERROR", "Failed to delete company.");
  }
});

export default DeleteCompanyRoute;