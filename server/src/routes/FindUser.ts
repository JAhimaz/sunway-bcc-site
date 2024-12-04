import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";

const FindUserRoute = express.Router();

FindUserRoute.get("/:address", async (req, res) => {
  
  const { address } = req.params;

  User.findOne({ address: address }).then((user) => {
    // If the user is not found, create a new user
    
    user.key = undefined

    if (!user) {
      return Error(res, 500, "USER_NOT_FOUND", "User not found", null)
    } else {
      return Success(res, 200, "USER_FOUND", "User found successfully", user)
    }
  })

})

export default FindUserRoute;