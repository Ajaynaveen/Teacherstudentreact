// src/components/AddTeacherForm.js
import React, { useState } from 'react';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';

function AddTeacherForm() {
  const { addTeacher } = useStudentTeacherContext();
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({ ...newTeacher, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeacher(newTeacher);
    setNewTeacher({ name: '', subject: '' });
  };

  return (
    <div>
      <h2>Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newTeacher.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTeacherForm;
