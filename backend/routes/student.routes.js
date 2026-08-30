const {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
  } = require("../controllers/student.controller");

  const verify = require("../middleware/verify")
  
  function userRoutes(app) {
  app.get("/api/students", verify,getAllStudents);
  app.get("/api/students/:id",verify, getStudentById);
  app.post("/api/students",verify, createStudent);
  app.put("/api/students/:id",verify, updateStudent);
  app.delete("/api/students/:id",verify, deleteStudent);
  }
  
  module.exports = userRoutes;
  