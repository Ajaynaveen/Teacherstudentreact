// src/components/Student.js
import React from 'react';
import { StudentTeacherProvider } from '../context/StudentTeacherContext';
import StudentList from './StudentList';
import AddStudentForm from './AddStudentForm';
import { Link } from 'react-router-dom';

function Student() {
  return (
    <StudentTeacherProvider>
      <div>
        <StudentList />
        <AddStudentForm />
        <Link to="/">Dashboard</Link>
        
      </div>
    </StudentTeacherProvider>
  );
}

export default Student;
