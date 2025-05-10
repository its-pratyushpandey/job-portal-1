import express from "express";
import { getRecruiterStats } from "../controllers/recruiter.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/stats", isAuthenticated, getRecruiterStats);

export default router;