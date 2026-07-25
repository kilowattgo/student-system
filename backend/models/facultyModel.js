const pool = require("../config/db");

async function getAllFaculties() {
  const result = await pool.query(`
    SELECT faculty_id, faculty_name
    FROM faculties
    ORDER BY faculty_name
  `);

  return result.rows;
}

module.exports = {
  getAllFaculties
};
