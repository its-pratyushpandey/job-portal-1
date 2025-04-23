import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register user with file upload (e.g. profile image)
router.post("/register", singleUpload, register);

// Login and logout routes
router.post("/login", login);
router.get("/logout", logout);

// Update profile (protected route, with upload)
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;
