import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";

const GetAdministratorsRoute = express.Router();

GetAdministratorsRoute.get("/", async (req, res) => {
  
  User.find({ isAdmin: true }).then((users) => {
    const userSorted = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        address: user.address,
      }
    })

    return Success(res, 200, "USERS_FOUND", "Users found successfully", userSorted)
  }).catch((err) => {
    return Error(res, 500, "USERS_FIND_FAILED", "Failed to find users", err)
  })

})

export default GetAdministratorsRoute;