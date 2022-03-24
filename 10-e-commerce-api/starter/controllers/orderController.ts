import express from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import checkPermissions from "../utils/checkPermissions";

const createOrder = async (req: any, res: express.Response) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("Cart is empty");
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError("Tax or Shipping Fee is missing");
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
