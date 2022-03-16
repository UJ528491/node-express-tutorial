import express from "express";
import Review from "../models/Review";
import StatusCodes from "http-status-codes";
import CustomError from "../errors";

const createReview = async (req: any, res: express.Response) => {
  const { rating, title, comment, product } = req.body;
  const user = req.user.userId;
  // check product exists
  const isValidProduct = await Review.findOne({
    _id: product,
  });
  if (!isValidProduct) {
    new CustomError.NotFoundError(`No product with id : ${product}`);
  }
  // check already reviewed
  const alreadyReviewed = await Review.findOne({ user, product });
  if (alreadyReviewed) {
    throw new CustomError.BadRequestError(
      `You have already reviewed this product`
    );
  }

  const review = await Review.create({
    rating,
    title,
    comment,
    user,
    product,
  });
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req: any, res: express.Response) => {
  res.send("getAllReviews");
};

const getSingleReview = async (req: any, res: express.Response) => {
  res.send("getSingleReview");
};

const updateReview = async (req: any, res: express.Response) => {
  res.send("updateReview");
};

const deleteReview = async (req: any, res: express.Response) => {
  res.send("deleteReview");
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
