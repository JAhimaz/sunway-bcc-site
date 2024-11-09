import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";

const UpdateUserStampsRoute = express.Router();

UpdateUserStampsRoute.post("/", async (req, res) => {
  try {
    const { name, newName } = req.body;

    if (!name || !newName) {
      return Error(res, 400, "INCOMPLETE_DATA", "Please provide all required data", {
        name: name ? "Valid" : "Missing",
        newName: newName ? "Valid" : "Missing",
      });
    }

    // Update users and count affected documents
    const result = await User.updateMany(
      { "stamps.name": name },
      { $set: { "stamps.$.name": newName } }
    );

    return Success(res, 200, "STAMP_NAME_UPDATED", "Stamp names updated successfully", {
      affectedUsers: result.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    return Error(res, 500, "STAMP_NAME_UPDATE_FAILED", "Failed to update stamp names", error);
  }
});

export default UpdateUserStampsRoute;
