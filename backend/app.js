import express from "express";
import cookieParser from "cookie-parser";
import {
  getAnnounces,
  getAnnounce,
  createAnnounce,
  updateAnnounce,
  deleteAnnounce,
} from "./controllers/announce.js";

import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "./controllers/review.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/announces", getAnnounces);
app.get("/announces/:id", getAnnounce);
app.post("/announces", createAnnounce);
app.put("/announces/:id", updateAnnounce);
app.delete("/announces/:id", deleteAnnounce);

app.get("/reviews", getReviews);
app.post("/reviews", createReview);
app.put("/reviews/:id", updateReview);
app.delete("/reviews/:id", deleteReview);

export default app;
