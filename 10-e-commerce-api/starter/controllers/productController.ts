import express from "express";
import Product from "../models/Product";
import StatusCodes from "http-status-codes";
import CustomError from "../errors";

const createProduct = async (req: any, res: express.Response) => {
  const { name, price, description, image, company, category } = req.body;
  const product = await Product.create({
    name,
    price,
    description,
    image,
    category,
    company,
    user: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req: any, res: express.Response) => {
  const product = await Product.find();
  res.status(StatusCodes.OK).json({ product });
};

const getSingleProduct = async (req: any, res: express.Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req: any, res: express.Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req: any, res: express.Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Product deleted" });
};

const uploadImage = async (req: any, res: express.Response) => {
  res.json({ message: "upload image" });
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
