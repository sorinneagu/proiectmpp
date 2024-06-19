import express from "express";
import {
  getReviews,
  createReview,
  deleteReview,
} from "../controllers/review.js";

const router = express.Router();

// router.get("/reviews/", getReviews);
// router.post("/review/", createReview);
// router.delete("/review/:id", deleteReview);
router.get("/", getReviews);
router.post("/", createReview);
router.delete("/:id", deleteReview);

export default router;
