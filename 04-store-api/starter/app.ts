import dotenv from "dotenv";
dotenv.config();
require("express-async-errors");
// import { express-async-errors } from "express-async-errors";
import express from "express";
import notFoundMiddleware from "../starter/middleware/not-found";
import errorHandlerMiddleware from "../starter/middleware/error-handler";
import connectDB from "./db/connect";
import { router } from "./routes/products";

const app = express();

// midleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", router);

// products route

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening "http://localhost:${port}"`)
    );
  } catch (err) {}
};

start();
