import express from "express";
import {
  markAttendance,
  getAttendanceByEmployee,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/", markAttendance);
router.get("/employee/:id", getAttendanceByEmployee);

export default router;
