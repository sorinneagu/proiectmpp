import express from "express";
import {
  getAnnounces,
  getAnnounce,
  createAnnounce,
  updateAnnounce,
  deleteAnnounce,
} from "../controllers/announce.js";

const router = express.Router();

router.get("/announces", getAnnounces);
router.get("/announce/:id", getAnnounce);
router.post("/announce", createAnnounce);
router.put("/announce/:id", updateAnnounce);
router.delete("/announce/:id", deleteAnnounce);

export default router;
