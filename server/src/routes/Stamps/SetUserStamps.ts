import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";

const SetUserStampsRoute = express.Router();

const expValues = {
  "workshop": 20,
  "talk": 40,
  "external": 50,
  "major": 100
}

SetUserStampsRoute.post("/", async (req, res) => {

  const { addresses, eventName, eventType, eventDate } = req.body;

  if(!addresses || !eventName || !eventType || !eventDate) {
    return Error(res, 400, "INCOMPLETE_DATA", "Please provide all required data", {
      addresses: addresses ? "Valid" : "Missing",
      eventName: eventName ? "Valid" : "Missing",
      eventType: eventType ? "Valid" : "Missing",
      eventDate: eventDate ? "Valid" : "Missing"
    });
  }

  if (eventType !== "workshop" && eventType !== "talk" && eventType !== "external" && eventType !== "major") {
    return Error(res, 400, "INVALID_EVENT_TYPE", "Event type is invalid");
  }

  const newStamp = {
    name: eventName,
    date: new Date(eventDate), // Ensure date is in Date format
    eventType: eventType
  };

  const eventExp = expValues[eventType] || 0;

  try {
        const bulkOps = addresses.map(address => ({
            updateOne: {
                filter: {
                    address,
                    // Ensure no duplicate stamps for the same event (by name and date)
                    'stamps.name': { $ne: eventName },
                    'stamps.date': { $ne: new Date(eventDate) }
                },
                update: {
                    $addToSet: { stamps: newStamp }, // Add stamp if not a duplicate
                    $inc: { exp: eventExp } // Add EXP only if stamp is new
                }
            }
        }));

        // Execute the bulk operations
        const result = await User.bulkWrite(bulkOps);

        if (result.modifiedCount === 0) {
          // No users were updated
          return Error(res, 404, "NO_UPDATE", "No users were updated");
        }

        return Success(res, 200, "STAMP_SET", "Stamps and EXP updated successfully");
    } catch (error) {
        return Error(res, 500, "UNKNOWN_ERROR", "Another error has occurred.", error);
    }

})

export default SetUserStampsRoute;