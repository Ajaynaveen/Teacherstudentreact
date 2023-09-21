
import React from 'react';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';
import { Link } from 'react-router-dom';

function TeacherList() {
  const { teachers } = useStudentTeacherContext();

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>{teacher.name}
          
          <Link to={`/teacherspage/${teacher.id}/edit`}>Edit</Link>
            <Link to={`/teacherspage/${teacher.id}/delete`}>Delete</Link>
            <Link to={`/teacherspage/${teacher.id}`}>show</Link>
          
          </li>
          
          
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
