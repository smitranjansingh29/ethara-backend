import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  const { employeeId, date, status } = req.body;

  if (!employeeId || !date || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const attendance = await Attendance.create({
    employee: employeeId,
    date,
    status,
  });

  res.status(201).json(attendance);
};

export const getAttendanceByEmployee = async (req, res) => {
  const records = await Attendance.find({
    employee: req.params.id,
  }).sort({ date: -1 });

  res.json(records);
};
