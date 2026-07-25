const studentModel = require("../models/studentModel");

async function getStudents(req, res) {

    try {

        const students =
            await studentModel.getAllStudents();

        res.json(students);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
}

async function getStudentById(req, res) {

    try {

        const id = req.params.id;

        const student =
            await studentModel.getStudentById(id);

        res.json(student);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
}

async function createStudent(req, res) {

    try {

        const student =
            await studentModel.createStudent(req.body);

        res.status(201).json(student);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
}

async function updateStudent(req, res) {

    try {

        const id = req.params.id;

        const student =
            await studentModel.updateStudent(
                id,
                req.body
            );

        res.json(student);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
}

async function deleteStudent(req, res) {

    try {

        const id = req.params.id;

        const student =
            await studentModel.deleteStudent(id);

        res.json(student);

    } catch (error) {

    console.error(error);

    res.status(500).json({
        error: error.message
    });
}
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};