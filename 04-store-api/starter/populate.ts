import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect";
// const connectDB = require("./db/connect");
import Product from "./models/product";
// const Product = require("./models/product");
import jsonProducts from "./products.json";
// const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("success!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
