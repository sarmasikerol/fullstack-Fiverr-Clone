import express from "express";
import {
  createGig,
  deleteGig,
  getAllGigs,
  getGig,
} from "../controllers/gig.controller.js";
import protect from "../middlewares/protect.js";
import upload from "../utils/multer.js";

// router oluştur
const router = express.Router();

// yolları tanımla
router.get("/", getAllGigs);
router.get("/:id", getGig);
router.post(
  "/",
  protect,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 6 },
  ]),
  createGig
);
router.delete("/:id", protect, deleteGig);

// export et ve server.js'e tanıt
export default router;
