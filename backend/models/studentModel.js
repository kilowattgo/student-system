const pool = require("../config/db");

async function getAllStudents() {

    const result = await pool.query(`
        SELECT
            s.student_id,
            s.student_code,
            s.first_name,
            s.last_name,
            s.email,
            s.phone,
            s.faculty_id,
            f.faculty_name
        FROM students s
        JOIN faculties f
            ON s.faculty_id = f.faculty_id
        ORDER BY s.student_id
    `);

    return result.rows;
}

async function getStudentById(id) {

    const result = await pool.query(`
        SELECT
            s.student_id,
            s.student_code,
            s.first_name,
            s.last_name,
            s.email,
            s.phone,
            s.faculty_id,
            f.faculty_name
        FROM students s
        JOIN faculties f
            ON s.faculty_id = f.faculty_id
        WHERE s.student_id = $1
    `, [id]);

    return result.rows[0];
}

async function createStudent(student) {

    const {
        student_code,
        first_name,
        last_name,
        email,
        phone,
        faculty_id
    } = student;

    const result = await pool.query(
        `
        INSERT INTO students
        (
            student_code,
            first_name,
            last_name,
            email,
            phone,
            faculty_id
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)

        RETURNING *
        `,
        [
            student_code,
            first_name,
            last_name,
            email,
            phone,
            faculty_id
        ]
    );

    return result.rows[0];
}

async function updateStudent(id, student) {

    const {
        student_code,
        first_name,
        last_name,
        email,
        phone,
        faculty_id
    } = student;

    const result = await pool.query(
        `
        UPDATE students
        SET
            student_code = $1,
            first_name = $2,
            last_name = $3,
            email = $4,
            phone = $5,
            faculty_id = $6
        WHERE student_id = $7
        RETURNING *
        `,
        [
            student_code,
            first_name,
            last_name,
            email,
            phone,
            faculty_id,
            id
        ]
    );

    return result.rows[0];
}

async function deleteStudent(id) {

    // ลบ enrollment ก่อน
    await pool.query(
        `
        DELETE FROM enrollments
        WHERE student_id = $1
        `,
        [id]
    );

    // ค่อยลบนักศึกษา
    const result = await pool.query(
        `
        DELETE FROM students
        WHERE student_id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};

