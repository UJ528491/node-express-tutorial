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
router.post("/updateUser", updateUser);
router.post("/updateUserPassword", updateUserPassword);
router.get("/:id", getSingleUser);

export default router;
