import express from "express";
import { body } from "express-validator";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);

router.post(
  "/",
  [
    body("employeeId").notEmpty(),
    body("fullName").notEmpty(),
    body("email").isEmail(),
    body("department").notEmpty(),
  ],
  createEmployee,
);

router.delete("/:id", deleteEmployee);

export default router;
