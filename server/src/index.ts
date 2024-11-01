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
import HealthRoute from "@routes/Health";
import GenerateUsername from "./libs/NameGenerator/NameGenerator";

const app = express();

mongoose.connect(Env.MONGODB_URI).then(() => {
  console.log("Database connection has been established.");
}).catch((err) => {
  console.log(err);
});

app.use(cookieParser());
app.use(cors({
  origin: Env.CLIENT_URL,
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cache-Control', 'Cookie'],
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

  console.log(`Server is running in ${Env.NODE_ENV} mode on ${Env.CLIENT_URL}:${port}`);
}).on("error", (err) => {
  console.log(`An error has occured: ${err}`);
});

// Limiters
app.use('/api/', rateLimit({
  // 10 requests every minute
  windowMs: 60 * 1000,
  max: 10,
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
app.use("/api/health", HealthRoute);