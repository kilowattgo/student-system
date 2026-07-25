import axios from "axios";

const API_URL = "http://localhost:3000/api/students/";
const FACULTY_URL = "http://localhost:3000/api/faculties/";

export async function getStudents() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getFaculties() {
  const response = await axios.get(FACULTY_URL);
  return response.data;
}

export async function createStudent(student) {
  const response = await axios.post(API_URL, student);
  return response.data;
}

export async function updateStudent(id, student) {
  const response = await axios.put(`${API_URL}/${id}`, student);
  return response.data;
}

export async function deleteStudent(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}