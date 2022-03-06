import express from "express";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/showme", showCurrentUser);
router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);
router.get("/:id", getSingleUser);

export default router;
