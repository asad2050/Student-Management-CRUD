import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const STUDENT_API_URL = `${API_URL}/students`;

const StudentsPage = () => {
  const token = useSelector((store) => store.auth.token) || localStorage.getItem("token");

  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function fetchStudents() {
    setLoading(true);
    try {
      const response = await axios.get(STUDENT_API_URL, axiosConfig);
      setStudents(response.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchStudents();
  }, [token]);

  return (
    <div>
    <h2>Manage Students</h2>
    {error && <p>{error}</p>}

    {loading ? (
      <p>Loading students...</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No students found.</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.created_by?.name || "Unknown"}</td>
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
