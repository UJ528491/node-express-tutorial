import express from "express";
import Product from "../models/Product";
import StatusCodes from "http-status-codes";
import CustomError from "../errors";
import path from "path";

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
  const product = await Product.findById(req.params.id).populate("reviews");
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
  console.log(req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image/")) {
    throw new CustomError.BadRequestError("Only images allowed");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload an image smaller than 1mb"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
