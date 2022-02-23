import express from "express";
require("express-async-errors");
require("dotenv").config();
// database
import connectDB from "./db/connect";
// midleware
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
// rest of packages
import morgan from "morgan";

// express
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("e-commerce-api");
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port "http://localhost:${port}"...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
