import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const STUDENT_API_URL = `${API_URL}/students`;

const StudentsPage = () => {
  const token =
    useSelector((store) => store.auth.token) || localStorage.getItem("token");

  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  async function fetchStudents() {
    setLoading(true);
    try {
      const response = await axios.get(STUDENT_API_URL, axiosConfig);
      setStudents(response.data);
      setError("");
    } catch (err) {
      // console.log(err);
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchStudents();
  }, [token]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(formData);
    let { name, email, phone } = formData;
    if (!name || !email || !phone) {
      alert("Enter proper details");
      return;
    }
    setError("");
    try {
      if (editingId) {
        const response = await axios.put(
          `${STUDENT_API_URL}/${editingId}`,
          formData,
          axiosConfig
        );
        setStudents(
          students.map((student) =>
            student._id === editingId ? response.data : student
          )
        );
      } else {
        const response = await axios.post(
          STUDENT_API_URL,
          formData,
          axiosConfig
        );
        setStudents([...students, response.data]);
      }
      resetForm();
    } catch (err) {
      // console.log(err);
      setError(
        err.response?.data || "An error occurred while creating the student."
      );
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${STUDENT_API_URL}/${id}`, axiosConfig);
      setStudents(students.filter((student) => student._id != id));
    } catch (err) {
      console.log(err);
      setError("Failed to delete student.");
    }
  }

  function handleEdit(student) {
    setEditingId(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
    });
  }
  function resetForm() {
    setFormData({ name: "", email: "", phone: "" });
    setEditingId(null);
    setError("");
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-600 text-center">
        Manage Students
      </h2>

      {error && (
        <p className="text-red-700 bg-red-200 border border-red-400 rounded px-3 py-2 mb-4">
          {typeof error === "string" ? error : JSON.stringify(error)}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mb-6 bg-amber-100 p-4 rounded">
        <h3 className="text-lg font-bold mb-3 text-red-600">
          {editingId ? "Edit Student" : "Add New Student"}
        </h3>

        <div className="mb-3">
          <label className="block mb-1 font-medium text-red-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-red-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium text-red-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-red-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium text-red-600">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-red-300 rounded px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded mr-2 cursor-pointer"
        >
          {editingId ? "Update Student" : "Save Student"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p className="text-red-600 font-bold">Loading students...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-amber-100">
              <th className="border p-2 text-left text-red-600">Name</th>
              <th className="border p-2 text-left text-red-600">Email</th>
              <th className="border p-2 text-left text-red-600">Phone</th>
              <th className="border p-2 text-left text-red-600">Added By</th>
              <th className="border p-2 text-left text-red-600">Edit</th>
              <th className="border p-2 text-left text-red-600">Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="border p-2 text-center text-red-600">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="bg-amber-100">
                  <td className="border p-2 text-red-500">{student.name}</td>
                  <td className="border p-2 text-red-500">{student.email}</td>
                  <td className="border p-2 text-red-500">{student.phone}</td>
                  <td className="border p-2 text-red-500">
                    {student.created_by?.name || "Unknown"}
                  </td>
                  <td className="border p-2 text-red-500">
                    {" "}
                    <button
                      onClick={() => handleEdit(student)}
                      className="cursor-pointer"
                    >
                      <FaUserEdit color="blue" />
                    </button>
                  </td>
                  <td className="border p-2 text-red-500">
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="cursor-pointer"
                    >
                      <MdDelete color="red" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentsPage;
