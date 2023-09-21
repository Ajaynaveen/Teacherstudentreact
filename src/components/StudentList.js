import React from 'react';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';
import { Link } from 'react-router-dom'; // Import Link

function StudentList() {
  const { students } = useStudentTeacherContext();

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}
            <Link to={`/studentspage/${student.id}/edit`}>Edit</Link>
            <Link to={`/studentspage/${student.id}/delete`}>Delete</Link>
            <Link to={`/studentspage/${student.id}`}>show</Link>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
