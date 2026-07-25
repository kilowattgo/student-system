const facultyModel = require("../models/facultyModel");

async function getFaculties(req, res) {
  try {
    const faculties = await facultyModel.getAllFaculties();
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getFaculties
};
