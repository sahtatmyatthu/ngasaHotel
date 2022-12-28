import express from "express";
import { reserve } from "../controllers/reserve.js";

const router = express.Router();

// CREATE Reserve
router.post("/:roomId",reserve);


export default router;