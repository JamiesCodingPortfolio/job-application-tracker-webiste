import express from "express";
import { addApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/add", addApplication);

export default router;