import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";

const HealthRoute = express.Router();

HealthRoute.get("/", async (req, res) => {
  return Success(res, 200, "HEALTH_CHECK", "Server is healthy", {
    status: "healthy"
  })
})

export default HealthRoute;