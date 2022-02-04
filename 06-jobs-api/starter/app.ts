require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
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

app.use(express.json());

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
