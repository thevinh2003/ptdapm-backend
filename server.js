import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import appRouter from "./src/routers/index.js";
import { connectDB } from "./src/configs/index.js";
import dotenv from "dotenv";
dotenv.config();
import config from "./src/configs/passport.js";

const app = express();

config();

// helmet configuration
app.use(helmet());

// Body parser configuration
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false })); // parse application/x-www-form-urlencoded

// Cookie parser configuration
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: [
      "https://ptdapmadmin.onrender.com",
      "https://adidasclient.onrender.com",
      "http://localhost:3001",
      "http://localhost:3000",
    ],
    credentials: true, // allow session cookie from browser to pass through
  })
);

// Connect mysql
connectDB();

// Router configuration
appRouter(app);

// Run the server
app.listen(process.env.PORT || 8080, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
