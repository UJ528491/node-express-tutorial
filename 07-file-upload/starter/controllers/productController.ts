import Product from "../models/Product";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;
  const product = await Product.findOneAndDelete({
    _id: id,
  });
  if (!product) {
    throw new NotFoundError("Product not found");
  }
  res.status(StatusCodes.OK).send();
};

export { createProduct, getAllProducts, deleteProduct };
