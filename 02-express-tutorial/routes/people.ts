import express from "express";
const router = express.Router();
import {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} from "../controllers/people";

// router.get("/", getPeople);
// router.post("/", createPerson);
// router.post("/postman", createPersonPostman);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);

router.route("/").get(getPeople).post(createPerson);
router.route("/postman").post(createPersonPostman);
router.route("/:id").put(updatePerson).delete(deletePerson);
export default router;
