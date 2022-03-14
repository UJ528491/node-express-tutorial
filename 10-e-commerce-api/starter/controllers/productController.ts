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
  res.json({ message: "get all products" });
};

const getSingleProduct = async (req: any, res: express.Response) => {
  res.json({ message: "get single product" });
};

const updateProduct = async (req: any, res: express.Response) => {
  res.json({ message: "update product" });
};

const deleteProduct = async (req: any, res: express.Response) => {
  res.json({ message: "delete product" });
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
