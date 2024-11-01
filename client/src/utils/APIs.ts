type ENV_TYPES = "development" | "production";

export const env = "development" as ENV_TYPES;
// export const env = "production" as ENV_TYPES;

export const DATA_API = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "https://api.sunwayblockchain.com" : "http://localhost:8080";
export const CLIENT_URL = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "https://sunwayblockchain.com" : "http://localhost:3000";

// get the version from package.json
export const APP_VERSION = `v${require("../../package.json").version}`;