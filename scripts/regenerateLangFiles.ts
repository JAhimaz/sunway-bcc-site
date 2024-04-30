import fs from "fs";
import baseData from "../messages/en.json";

const main = async () => {
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

  const files = fs.readdirSync("./messages/");

  for (const file of files) {
    if (file !== "en.json" && file.endsWith(".json")) {
      const filePath = `./messages/${file}`;

      // Read the file content using fs
      const langData = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Remove extra keys
      const removeExtraKeys = (base: any, current: any) => {
        for (const key in current) {
          if (!(key in base)) {
            delete current[key];
          } else if (isObject(current[key])) {
            removeExtraKeys(base[key], current[key]);
          }
        }
      };

      removeExtraKeys(emptyData, langData);

      // Add missing keys
      const addMissingKeys = (base: any, current: any) => {
        for (const key in base) {
          if (!(key in current)) {
            if (isObject(base[key])) {
              current[key] = {};
              addMissingKeys(base[key], current[key]);
            } else {
              current[key] = "";
            }
          } else if (isObject(base[key])) {
            addMissingKeys(base[key], current[key]);
          }
        }
      };

      addMissingKeys(emptyData, langData);

      // Write the updated file
      fs.writeFileSync(filePath, JSON.stringify(langData, null, 2));
      console.log(`Updated ${file}`);
    }
  }
};

main()
  .then(() => console.log("Updated All Language Files"))
  .catch((e) => console.error(e));
