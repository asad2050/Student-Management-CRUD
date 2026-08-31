const StudentModel = require("../models/student.model");

async function getAllStudents(req, res) {
  try {
    let students = await StudentModel.find().populate("created_by", "name");
    return res.status(200).json(students);
  } catch (err) {
    // console.error(err);
    return res.status(500).json("Error while fetching students");
  }
}

async function getStudentById(req, res) {
  try {
    let { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json("Invalid student ID format");
    }

    let student = await StudentModel.findById(id).populate(
      "created_by",
      "email"
    );

    if (!student) {
      return res.status(404).json("Student does not exist");
    }

    return res.status(200).json(student);
  } catch (err) {
    // console.error(err);
    return res.status(500).json("Error while fetching student details");
  }
}

async function createStudent(req, res) {
  try {
    let { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json("Name, email, and phone are required");
    }

    let existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res.status(409).json("Student email already exists");
    }

    let creatorId = req.user._id;

    let newStudent = await StudentModel.create({
      name,
      email,
      phone,
      created_by: creatorId,
    });

    return res.status(201).json(newStudent);
  } catch (err) {
    // console.error(err);
    return res.status(500).json("Error while creating student");
  }
}

async function updateStudent(req, res) {
  try {
    let { id } = req.params;
    let { name, email, phone } = req.body;
    
    if (!id || id.length !== 24) {
      return res.status(400).json("Invalid student ID format");
    }

    if (!name || !email || !phone) {
      return res.status(400).json("No data provided to update");
    }

    let updatedStudent = await StudentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("created_by", "name");

    if (!updatedStudent) {
      return res.status(404).json("Student does not exist");
    }

    return res.status(200).json(updatedStudent);
  } catch (err) {
    // console.error(err);
    return res.status(500).json("Error while updating student");
  }
}

async function deleteStudent(req, res) {
  try {
    let { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json("Invalid student ID format");
    }

    let deletedStudent = await StudentModel.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json("Student does not exist");
    }

    return res.status(200).json("Student deleted successfully");
  } catch (err) {
    // console.error(err);
    return res.status(500).json("Error while deleting student");
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
