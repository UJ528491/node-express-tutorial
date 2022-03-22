import express from "express";

const createOrder = async (req: any, res: express.Response) => {
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
