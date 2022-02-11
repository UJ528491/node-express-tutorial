import Product from "../models/Product";
import { StatusCodes } from "http-status-codes";

const createProduct = async (req, res) => {
  res.send("create product");
};
const getAllProducts = async (req, res) => {
  res.send("get all products");
};

export { createProduct, getAllProducts };
