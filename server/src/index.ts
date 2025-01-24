import express, { json } from "express";
import mongoose from "mongoose";

// Middleware
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimit from 'express-rate-limit';
import cookieParser from "cookie-parser";

// DotENV
import { Env } from "@utils/Env";
import session from "express-session";
import MongoStore from 'connect-mongo'

// Routes
// import Route from "@routes/Route"; // Example Route
import GetUserInfoRoute from "@routes/GetUser";
import FindUserRoute from "./routes/FindUser";
import GetTopUsersRoute from "@routes/GetTopUsers";
import HealthRoute from "@routes/Health";

// Admin Routes
import GetAdministratorsRoute from "@routes/Admin/GetAdministrators";
import SetAdministratorsRoute from "./routes/Admin/SetAdministrator";
import DeleteAdministratorsRoute from "./routes/Admin/DeleteAdministrator";
import isAdministrator from "./middlewares/isAdmin";

// Stamp Routes
import SetUserStampsRoute from "./routes/Stamps/SetUserStamps";
import UpdateUserStampsRoute from "./routes/Stamps/UpdateStamps";
import CreateCompanyRoute from "./routes/Admin/Company/CreateCompany";
import GetCompaniesRoute from "./routes/Admin/Company/GetCompanies";
import UpdateCompanyRoute from "./routes/Admin/Company/UpdateCompany";
import DeleteCompanyRoute from "./routes/Admin/Company/DeleteCompany";

const app = express();

mongoose.connect(Env.MONGODB_URI).then(() => {
  console.log("Database connection has been established.");
}).catch((err) => {
  console.log(err);
});

app.use(cookieParser());
app.use(cors({
  origin: Env.CLIENT_URL,
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cache-Control', 'Cookie', 'address', 'key'],
  exposedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cache-Control', 'Cookie'],
  credentials: true
}))
app.use(
  session({
    secret: Env.SESSION_SECRET,
    resave: false, // This is to save the session even if it is not modified
    saveUninitialized: false, // This is to save the session even if the user is not logged in
    store: MongoStore.create({
      mongoUrl: Env.MONGODB_URI,
      crypto: {
        secret: Env.MONGODB_CRYPTO,
      }
    }),
    cookie: {
      // 5 days
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      domain: Env.NODE_ENV === 'production' ? '.sunwayblockchain.com' : 'localhost'
    },
    name: "sunwaybcc", // You may rename this to any session name you would like
  }),
);
app.use(bodyParser.json());
app.use(helmet());
app.use(json());

const port = Env.SERVER_PORT || 8080

app.listen(port, () => {
  console.log(`Server has started successfully on port ${port}`);
}).on("error", (err) => {
  console.log(`An error has occured: ${err}`);
});

// Limiters
// TODO, Modify to fix admins no request rate.
app.use('/api/', rateLimit({
  // 10 requests every minute
  windowMs: 60 * 1000,
  max: 5000,
  message: {
    error: {
      status: 429,
      message: 'Too many requests, please try again in a minute.'
    }
  }
}));


// Declaration of Routes

// Example Route Declaration
// app.use("/path/to/route", Route);
app.use("/api/user", GetUserInfoRoute);
app.use("/api/findUser", FindUserRoute);
app.use("/api/topusers", GetTopUsersRoute);
app.use("/api/health", HealthRoute);

// Admin Routes
app.use("/api/admin/admins", isAdministrator, GetAdministratorsRoute);
app.use("/api/admin/setadmin", isAdministrator, SetAdministratorsRoute);
app.use("/api/admin/remove", isAdministrator, DeleteAdministratorsRoute);

// Stamp Routes
app.use("/api/stamps/setbulk", SetUserStampsRoute);
app.use("/api/stamps/updatenames", UpdateUserStampsRoute);

// Company Routes
app.use("/api/admin/company/createcompany", isAdministrator, CreateCompanyRoute);
app.use("/api/admin/company/getcompanies", isAdministrator, GetCompaniesRoute);
app.use("/api/admin/company/updatecompany", isAdministrator, UpdateCompanyRoute);
app.use("/api/admin/company/deletecompany", isAdministrator, DeleteCompanyRoute);
