/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/routes/rentTypeRoutes.js
 * Description: Rent Type API routes with authentication & admin middleware.
 * ==============================================================================
 */

import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  getRentTypes,
  createRentType,
  updateRentType,
  deleteRentType,
} from "../controllers/rentTypeController.js";

const router = express.Router();

router.get("/", getRentTypes);
router.post("/", protect, adminOnly, createRentType);
router.put("/:id", protect, adminOnly, updateRentType);
router.delete("/:id", protect, adminOnly, deleteRentType);

export default router;
