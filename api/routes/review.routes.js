import express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
} from "../controllers/review.controller.js";
import protect from "../middlewares/protect.js";

const router = express.Router();

router.post("/", protect, createReview);

router.get("/:gigId", getReviews);

router.delete("/:id", protect, deleteReview);

export default router;
