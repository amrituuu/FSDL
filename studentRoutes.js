const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE student
router.post("/add", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SEARCH student by roll number
router.get("/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE student by roll number
router.put("/:rollNo", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE student by roll number
router.delete("/:rollNo", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({
      rollNo: req.params.rollNo
    });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;