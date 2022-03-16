import express from "express";
import Review from "../models/Review";
import StatusCodes from "http-status-codes";
import CustomError from "../errors";

const createReview = async (req: any, res: express.Response) => {
  res.send("createReview");
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
