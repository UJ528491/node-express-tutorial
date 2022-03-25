import express from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import Product from "../models/Product";
import checkPermissions from "../utils/checkPermissions";

const createOrder = async (req: any, res: express.Response) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("Cart is empty");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError("Tax or Shipping Fee is missing");
  }

  let orderItems: any[] = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(`Product ${item.product} not found`);
    }
    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to orderItems
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }

  res.send("create order");
};
const getAllOrders = async (req: any, res: express.Response) => {
  res.send("get all orders");
};
const getSingleOrder = async (req: any, res: express.Response) => {
  res.send("get single order");
};
const getCurrentUserOrders = async (req: any, res: express.Response) => {
  res.send("get current user orders");
};
const updateOrder = async (req: any, res: express.Response) => {
  res.send("update order");
};

export {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
