import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import upload from "../utils/multer.js";

//1) router oluşturma
const router = express.Router();

//2) yolları belirle
router.post("/register", upload.single("photo"), register);

router.post("/login", login);

router.post("/logout", logout);

//3 router'ı app'e tanıtmak için export
export default router;
