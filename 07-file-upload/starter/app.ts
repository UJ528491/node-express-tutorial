require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

import fileUpload from "express-fileupload";
// cloudinary
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

// database
import connectDB from "./db/connect";

// product router
import { router } from "./routes/productRoutes";

// error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

app.use("/api/v1/products", router);

// middleware
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
