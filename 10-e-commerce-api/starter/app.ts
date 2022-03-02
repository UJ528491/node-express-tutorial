// express
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
// routers
import authRoutes from "./routes/authRoutes";
// cookie-parser
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("e-commerce-api");
});

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("e-commerce-api");
});

app.use("/api/v1/auth", authRoutes);

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
