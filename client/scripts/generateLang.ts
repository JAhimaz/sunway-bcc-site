import fs from "fs";
import baseData from "../messages/en.json";

// INSERT THE FILE NAME HERE
const newfileName = "es"; // For example: "fr" or "de"

const main = async (newFile: string) => {
  if (!newFile) {
    throw new Error("No file name provided", {
      cause: "Please provide a file name to generate a new language file",
    });
  }

  // copy all the keys from baseData
  const emptyData = {};

  // check if an object key has more objects
  const isObject = (obj: any) => {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
  };

  // recursively copy all the keys from baseData
  const copyKeys = (base: any, empty: any) => {
    for (const key in base) {
      if (isObject(base[key])) {
        empty[key] = {};
        copyKeys(base[key], empty[key]);
      } else {
        empty[key] = "";
      }
    }
  };

  copyKeys(baseData, emptyData);

  // write to file
  const json = JSON.stringify(emptyData, null, 2);
  // create and write to file
  fs.writeFile(`./messages/${newFile}.json`, json, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

main(newfileName)
  .then(() => console.log("Generated new language file"))
  .catch((e) => console.error(e));
