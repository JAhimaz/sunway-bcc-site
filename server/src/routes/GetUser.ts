import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";

const GetUserInfoRoute = express.Router();

GetUserInfoRoute.get("/:address", async (req, res) => {
  
  const { address } = req.params;

  User.findOne({ address: address }).then((user) => {
    // If the user is not found, create a new user
    if (!user) {
      User.create({
        address: address,
        exp: 0,
        stamps: [],
        isAdmin: false,
        version: 0,
      }).then((newUser) => {
        return Success(res, 200, "USER_CREATED", "User created successfully", newUser)
      }).catch((err) => {
        return Error(res, 500, "USER_CREATE_FAILED", "Failed to create user", err)
      })
    } else {
      return Success(res, 200, "USER_FOUND", "User found successfully", user)
    }
  })

})

export default GetUserInfoRoute;