import express from "express";
import { addApplication, deleteApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/add", addApplication);
router.post("/delete", deleteApplication);

export default router;