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
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import orderRoutes from "./routes/orderRoutes";
// cookie-parser
import cookieParser from "cookie-parser";
// image upload
import fileUpload from "express-fileupload";
// security packages
import helmet from "helmet";
import cors from "cors";
const xss = require("xss-clean");
import mongoSanitize from "express-mongo-sanitize";
const rateLimiter = require("express-rate-limit");

const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("e-commerce-api");
});

app.get("/api/v1", (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("e-commerce-api");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/orders", orderRoutes);

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
