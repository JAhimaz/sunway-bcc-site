import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";

const ClaimCertificateRoute = express.Router();

ClaimCertificateRoute.post("/:address", async (req, res) => {
  
  const { address } = req.params;

  // Check if certificateClaimed is true, if true, return error

  

})