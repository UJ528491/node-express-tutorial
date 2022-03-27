import express from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import Order from "../models/order";
import Product from "../models/Product";
import checkPermissions from "../utils/checkPermissions";

const fakeStripeAPI = async ({ data, currency }: any) => {
  const client_secret = "someRandomString";
  return { client_secret };
};

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
  // calculate total
  const total = tax + shippingFee + subtotal;
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.client_secret });
};
const getAllOrders = async (req: any, res: express.Response) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const getSingleOrder = async (req: any, res: express.Response) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};
const getCurrentUserOrders = async (req: any, res: express.Response) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};
const updateOrder = async (req: any, res: express.Response) => {
  const { id: orderId } = req.params;
  const { paymentIntent } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  order.paymentIntent = paymentIntent;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

export {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
