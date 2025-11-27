import express from "express";
import { addApplication, deleteApplication, modifyApplication, getApplications } from "../controllers/applicationController.js";

const router = express.Router();

router.get("/", getApplications);
router.post("/", addApplication);
router.delete("/", deleteApplication);
router.patch("/", modifyApplication);

export default router;