import { useEffect, useState } from "react";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

import { getStudents, deleteStudent } from "./services/studentService";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const handleCancelEdit = () => {
    setSelectedStudent(null);
  };

  const handleStudentSaved = () => {
    setSelectedStudent(null);
    loadStudents();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this student?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteStudent(id);
      loadStudents();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_45%,_#7c3aed_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                ✦ Student Portal
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Student Management System
              </h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Manage student records with a clean, modern dashboard that keeps everything easy to scan.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-lg">
              <p className="text-sm text-slate-300">Registered students</p>
              <p className="text-3xl font-semibold">{students.length}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_1.45fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.16)]">
            <StudentForm
              selectedStudent={selectedStudent}
              onStudentSaved={handleStudentSaved}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.16)]">
              <StudentTable
                students={students}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.24)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Selected student</p>
                  <h2 className="text-xl font-semibold">Quick details</h2>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
                  {selectedStudent ? "Active" : "Waiting"}
                </span>
              </div>

              {selectedStudent ? (
                <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm">
                  <p><span className="text-slate-400">ID:</span> {selectedStudent.student_id}</p>
                  <p><span className="text-slate-400">Code:</span> {selectedStudent.student_code}</p>
                  <p><span className="text-slate-400">Name:</span> {selectedStudent.first_name} {selectedStudent.last_name}</p>
                  <p><span className="text-slate-400">Email:</span> {selectedStudent.email || "-"}</p>
                  <p><span className="text-slate-400">Phone:</span> {selectedStudent.phone || "-"}</p>
                  <p><span className="text-slate-400">Faculty:</span> {selectedStudent.faculty_name}</p>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-sm text-slate-300">
                  Select a student from the list to view their profile details.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;