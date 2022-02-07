require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
// extra security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

// error handler
import { notFound as notFoundMiddleware } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import { auth as authenticateUser } from "./middleware/authentication";
// routes
import { router as authRouter } from "./routes/auth";
import { router as jobsRouter } from "./routes/jobs";
// connectDB
import { connectDB } from "./db/connect";
// import { connectDB } from "../../03-task-manager/starter/db/connect"; my mistake..

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Server is listening on port "http://localhost:${port}"...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
