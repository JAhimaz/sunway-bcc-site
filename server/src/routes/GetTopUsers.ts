import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";

const GetTopUsersRoute = express.Router();

GetTopUsersRoute.get("/", async (req, res) => {
  
  // remove key from user
  User.find().sort({ exp: -1 }).limit(3).then((users) => {
    users.forEach((user) => {
      user.key = undefined
    })

    return Success(res, 200, "TOP_USERS_FOUND", "Top users found successfully", users)
  }).catch((err) => {
    return Error(res, 500, "TOP_USERS_FIND_FAILED", "Failed to find top users", err)
  })

})

export default GetTopUsersRoute;