import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";
import md5 from "md5";

const SetAdministratorsRoute = express.Router();

SetAdministratorsRoute.post("/", async (req, res) => {

  const { address } = req.body;
  
  // Find the user
  User.findOne({ address }).then((user) => {
    if (!user) {
      return Error(res, 404, "USER_NOT_FOUND", "User not found");
    }

    user.isAdmin = true;
    user.key = md5(user.address) + md5(process.env.ADMIN_PASSWORD);

    user.save().then(() => {
      return Success(res, 200, "ADMIN_SET", "User is now an administrator");
    }).catch((err) => {
      return Error(res, 500, "ADMIN_SET_FAILED", "Failed to set user as administrator", err);
    })

  }).catch((err) => {
    return Error(res, 500, "UNKNOWN_ERROR", "Another error has occurred.", err);
  });

})

export default SetAdministratorsRoute;