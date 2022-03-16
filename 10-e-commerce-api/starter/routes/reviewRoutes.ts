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

router
  .route("/")
  .post(authenticateUser, authorizePermissions("admin"), createReview);
router.route("/").get(getAllReviews);
router.route("/:id").get(getSingleReview);
router
  .route("/:id")
  .patch(authenticateUser, authorizePermissions("admin"), updateReview);
router
  .route("/:id")
  .delete(authenticateUser, authorizePermissions("admin"), deleteReview);

export default router;
