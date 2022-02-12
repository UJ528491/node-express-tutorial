import Product from "../models/Product";
import { StatusCodes } from "http-status-codes";

const createProduct = async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  res.send("get all products");
};

export { createProduct, getAllProducts };
