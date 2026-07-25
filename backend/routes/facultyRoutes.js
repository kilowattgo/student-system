const express = require("express");

const router = express.Router();
const facultyController = require("../controllers/facultyController");

router.get("/", facultyController.getFaculties);

module.exports = router;
