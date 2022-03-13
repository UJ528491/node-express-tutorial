import express from "express";
createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage;

const createproduct = async (req: any, res: express.Response) => {
  res.json({ message: "create product" });
};
