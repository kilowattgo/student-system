import { useEffect, useState } from "react";

import { createStudent, updateStudent } from "../services/studentService";

const facultyOptions = [
  { faculty_id: 1, faculty_name: "Faculty of Engineering" },
  { faculty_id: 2, faculty_name: "Faculty of Science" },
  { faculty_id: 3, faculty_name: "Faculty of Business" },
  { faculty_id: 4, faculty_name: "Faculty of Arts" }
];

function StudentForm({ selectedStudent, onStudentSaved, onCancelEdit }) {
  const [formData, setFormData] = useState({
    student_code: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    faculty_id: ""
  });
  const [faculties] = useState(facultyOptions);

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        student_code: selectedStudent.student_code || "",
        first_name: selectedStudent.first_name || "",
        last_name: selectedStudent.last_name || "",
        email: selectedStudent.email || "",
        phone: selectedStudent.phone || "",
        faculty_id: selectedStudent.faculty_id || ""
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setFormData({
      student_code: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      faculty_id: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentPayload = {
        ...formData,
        faculty_id: Number(formData.faculty_id)
      };

      if (selectedStudent) {
        await updateStudent(selectedStudent.student_id, studentPayload);
        alert("Student updated successfully");
      } else {
        await createStudent(studentPayload);
        alert("Student added successfully");
      }

      resetForm();
      onStudentSaved();
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error.response?.data || error.message, null, 2));
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          {selectedStudent ? "Edit profile" : "Create record"}
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          {selectedStudent ? "Edit Student" : "Add Student"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the details and save in a few seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Student Code</label>
            <input
              type="text"
              name="student_code"
              value={formData.student_code}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Faculty</label>
            <select
              name="faculty_id"
              value={formData.faculty_id}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
              required
            >
              <option value="">Select faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.faculty_id} value={faculty.faculty_id}>
                  {faculty.faculty_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90"
          >
            {selectedStudent ? "Update Student" : "Add Student"}
          </button>

          {selectedStudent && (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;