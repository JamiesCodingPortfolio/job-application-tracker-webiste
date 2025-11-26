import express from "express";
import { addApplication, deleteApplication, modifyApplication, getApplications } from "../controllers/applicationController.js";

const router = express.Router();

router.get("/", getApplications);
router.post("/", addApplication);
router.delete("/delete", deleteApplication);
router.patch("/modify", modifyApplication);

export default router;