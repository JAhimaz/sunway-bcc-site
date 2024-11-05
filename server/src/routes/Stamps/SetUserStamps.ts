import express from "express";
import User from "@models/User";
import Error from "@libs/error";
import Success from "@libs/success";
import { isAddress } from "ethers";

const SetUserStampsRoute = express.Router();

const expValues = {
  "workshop": 20,
  "talk": 40,
  "external": 50,
  "major": 100
};

SetUserStampsRoute.post("/", async (req, res) => {
  const { addresses, eventName, eventType, eventDate } = req.body;

  if (!addresses || addresses.length === 0 || !eventName || !eventType || !eventDate) {
    return Error(res, 400, "INCOMPLETE_DATA", "Please provide all required data", {
      addresses: addresses && addresses.length !== 0 ? "Valid" : "Missing",
      eventName: eventName ? "Valid" : "Missing",
      eventType: eventType ? "Valid" : "Missing",
      eventDate: eventDate ? "Valid" : "Missing"
    });
  }

  if (!expValues[eventType]) {
    return Error(res, 400, "INVALID_EVENT_TYPE", "Event type is invalid");
  }

  const validAddresses = addresses.filter((address) => isAddress(address));
  if (validAddresses.length === 0) {
    return Error(res, 400, "NO_VALID_ADDRESSES", "No valid Ethereum addresses provided.");
  }

  const newStamp = {
    name: eventName,
    date: new Date(eventDate),
    eventType: eventType
  };

  const eventExp = expValues[eventType] || 0;

  try {
    // Step 1: Find existing users by addresses
    const existingUsers = await User.find({ address: { $in: validAddresses } });
    const existingAddresses = new Set(existingUsers.map((user) => user.address));

    // Step 2: Separate addresses into existing and new
    const newAddresses = validAddresses.filter((address) => !existingAddresses.has(address));

    // Step 3: Create bulk operations for existing users
    const updateOps = existingUsers.map((user) => {
      const stampExists = user.stamps.some(
        (stamp) => stamp.name === eventName && stamp.date.getTime() === new Date(eventDate).getTime()
      );

      if (!stampExists) {
        return {
          updateOne: {
            filter: { address: user.address },
            update: {
              $addToSet: { stamps: newStamp },
              $inc: { exp: eventExp }
            }
          }
        };
      }
      return null; // If stamp exists, we skip this update
    }).filter(Boolean);

    // Step 4: Create bulk operations for new users
    const insertOps = newAddresses.map((address) => ({
      address,
      stamps: [newStamp],
      exp: eventExp
    }));

    // Step 5: Execute bulk operations
    const updateResult = updateOps.length > 0 ? await User.bulkWrite(updateOps) : { modifiedCount: 0 };
    const insertResult = insertOps.length > 0 ? await User.insertMany(insertOps) : [];

    // Step 6: Return summary response
    return Success(res, 200, "STAMP_SET", "Stamps and EXP updated successfully", {
      updatedCount: updateResult.modifiedCount,
      createdCount: insertResult.length,
      skippedCount: existingUsers.length - updateResult.modifiedCount
    });
  } catch (error) {
    return Error(res, 500, "UNKNOWN_ERROR", "An unknown error has occurred.", error);
  }
});

export default SetUserStampsRoute;
