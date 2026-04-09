import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rollNo: "",
    password: "",
    confirmPassword: "",
    contactNumber: ""
  });

  const [students, setStudents] = useState([]);
  const [searchRollNo, setSearchRollNo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const API_URL = "http://localhost:5000/api/students";

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    try {
      if (isEdit) {
        await fetch(`${API_URL}/${formData.rollNo}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("Student updated successfully");
        setIsEdit(false);
      } else {
        await fetch(`${API_URL}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("Student added successfully");
      }

      setFormData({
        firstName: "",
        lastName: "",
        rollNo: "",
        password: "",
        confirmPassword: "",
        contactNumber: ""
      });

      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleDelete = async (rollNo) => {
    try {
      await fetch(`${API_URL}/${rollNo}`, {
        method: "DELETE"
      });
      alert("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchRollNo) {
        fetchStudents();
        return;
      }

      const response = await fetch(`${API_URL}/${searchRollNo}`);
      const data = await response.json();

      if (response.ok) {
        setStudents(data ? [data] : []);
      } else {
        alert("Student not found");
        setStudents([]);
      }
    } catch (error) {
      console.error("Error searching student:", error);
      setStudents([]);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      firstName: student.firstName || "",
      lastName: student.lastName || "",
      rollNo: student.rollNo || "",
      password: student.password || "",
      confirmPassword: student.confirmPassword || "",
      contactNumber: student.contactNumber || ""
    });
    setIsEdit(true);
  };

  return (
    <div className="container">
      <h1>Student Registration System</h1>

      <form onSubmit={handleSubmit} className="form-box">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="text" name="rollNo" placeholder="Roll No" value={formData.rollNo} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <button type="submit">{isEdit ? "Update Student" : "Add Student"}</button>
      </form>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Roll No"
          value={searchRollNo}
          onChange={(e) => setSearchRollNo(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={fetchStudents}>Show All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roll No</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) && students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.rollNo}</td>
                <td>{student.contactNumber}</td>
                <td>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                  <button onClick={() => handleDelete(student.rollNo)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No student records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;