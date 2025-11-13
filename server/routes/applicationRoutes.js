import express from "express";
import { addApplication, deleteApplication, modifyApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.post("/add", addApplication);
router.delete("/delete", deleteApplication);
router.patch("/modify", modifyApplication);

export default router;