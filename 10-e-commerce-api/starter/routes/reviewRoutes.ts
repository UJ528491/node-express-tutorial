import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";
import express from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

const router = express.Router();

router.route("/").post(authenticateUser, createReview);
router.route("/").get(getAllReviews);
router.route("/:id").get(getSingleReview);
router.route("/:id").patch(authenticateUser, updateReview);
router.route("/:id").delete(authenticateUser, deleteReview);

export default router;
