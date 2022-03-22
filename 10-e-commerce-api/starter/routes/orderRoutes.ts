import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
} from "../controllers/orderController";
import express from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";

const router = express.Router();
router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders);
router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);
router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

export default router;
