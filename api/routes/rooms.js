import express from "express";
import { countAll, countByType, createRoom, deleteRoom, getByRating, getByRoomType, getReserve, getRoomById, getRooms, roomAvailability, updateAvailableRoom, updateRoom } from "../controllers/room.js";

const router = express.Router();

// CREATE
router.post("/", createRoom);

//UPDATE
router.put("/:id", updateRoom);
router.put("/availability/:id", roomAvailability);
router.get("/updateAvailableRoom/:id", updateAvailableRoom);

//DELETE
router.delete("/:id", deleteRoom)

// Room By Id
router.get("/find/:id", getRoomById)

//Get By Type
router.get("/type", getByRoomType);

// Get All
router.get("/", getRooms)
router.get("/countByType", countByType);
router.get("/countAll", countAll);
router.get("/getByrating", getByRating);
router.get("/available/:id", getReserve);

export default router;
