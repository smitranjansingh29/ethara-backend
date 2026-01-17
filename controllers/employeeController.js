import Employee from "../models/Employee.js";
import { validationResult } from "express-validator";

export const getEmployees = async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.json(employees);
};

export const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { employeeId, fullName, email, department } = req.body;

  const exists = await Employee.findOne({
    $or: [{ employeeId }, { email }],
  });

  if (exists) {
    return res
      .status(409)
      .json({ message: "Employee with same ID or email already exists" });
  }

  const employee = await Employee.create({
    employeeId,
    fullName,
    email,
    department,
  });

  res.status(201).json(employee);
};

export const deleteEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  await employee.deleteOne();
  res.json({ message: "Employee deleted" });
};
