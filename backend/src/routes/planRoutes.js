import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createStudyPlan,
  getStudyPlans,
  updateStudyPlan,
  deleteStudyPlan,
} from "../controllers/planController.js";

const router = express.Router();

router.route("/").get(protect, getStudyPlans).post(protect, createStudyPlan);
router.route("/:id").put(protect, updateStudyPlan).delete(protect, deleteStudyPlan);

export default router;
