import express from "express";
import Review from "../models/Review";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import checkPermissions from "../utils/checkPermissions";

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
  const reviews = await Review.find();
  if (!reviews) {
    throw new CustomError.NotFoundError(`No reviews found`);
  }
  res.status(StatusCodes.OK).json({ reviews });
};

const getSingleReview = async (req: any, res: express.Response) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new CustomError.NotFoundError(
      `No review found with id : ${req.params.id}`
    );
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req: any, res: express.Response) => {
  const { rating, title, comment } = req.body;
  const { id: reviewId } = req.params;
  const review = await Review.findOne({
    _id: reviewId,
  });
  if (!review) {
    throw new CustomError.NotFoundError(
      `No review found with id : ${reviewId}`
    );
  }
  checkPermissions(req.user, review.user);
  // await review.updateOne(req.body);
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req: any, res: express.Response) => {
  const { id: reviewId } = req.params.id;
  const review = await Review.findOne({
    _id: reviewId,
  });
  if (!review) {
    throw new CustomError.NotFoundError(
      `No review found with id : ${reviewId}`
    );
  }
  checkPermissions(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Review deleted" });
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
