// src/components/AddStudentForm.js
import React, { useState } from 'react';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';

function AddStudentForm() {
  const { addStudent } = useStudentTeacherContext();
  const [newStudent, setNewStudent] = useState({ name: '', age: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(newStudent);
    setNewStudent({ name: '', age: '' });
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newStudent.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={newStudent.age}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
