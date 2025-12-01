import express from "express";
import { login, signup, logout, verifySession } from "../controllers/authController.js";

const router = express.Router();

// GET routes
router.get("/verify-session", verifySession);

// POST routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;