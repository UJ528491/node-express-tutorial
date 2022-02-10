require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// database
import connectDB from "./db/connect";

// error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

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
