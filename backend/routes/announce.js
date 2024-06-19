import express from "express";
import {
  getAnnounces,
  getAnnounce,
  createAnnounce,
  updateAnnounce,
  deleteAnnounce,
} from "../controllers/announce.js";

const router = express.Router();

router.get("/", getAnnounces);
router.get("/:id", getAnnounce);
router.post("/", createAnnounce);
router.put("/:id", updateAnnounce);
router.delete("/:id", deleteAnnounce);

export default router;
