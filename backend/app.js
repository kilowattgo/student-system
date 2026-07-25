const express = require("express");
const cors = require("cors");

const studentController = require("./controllers/studentController");
const facultyController = require("./controllers/facultyController");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend ok");
});

app.get("/api/students/", studentController.getStudents);
app.get("/api/students/:id", studentController.getStudentById);
app.post("/api/students/", studentController.createStudent);
app.put("/api/students/:id", studentController.updateStudent);
app.delete("/api/students/:id", studentController.deleteStudent);

app.get("/api/faculties/", facultyController.getFaculties);

console.log("Routes loaded");

app.listen(3000, () => {
    console.log("Server Start");
});