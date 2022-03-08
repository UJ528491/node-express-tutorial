import express from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController";
const router = express.Router();

router.get("/", authenticateUser, authorizePermissions("admin"), getAllUsers);
router.get("/showme", authenticateUser, showCurrentUser);
router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);
router.get("/:id", authenticateUser, getSingleUser);

export default router;
