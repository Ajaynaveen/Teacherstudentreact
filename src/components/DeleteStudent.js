import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';

function DeleteStudent() {
  const { getStudentById, deleteStudent } = useStudentTeacherContext();
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({ name: '', age: '' });

  useEffect(() => {

    const getStudentDetails = async (studentId) => {
        try {
          const student = await getStudentById(studentId);
          if (student) {
            setStudentData({ name: student.name, age: student.age });
          } else {
            console.error('Student not found');
          }
        } catch (error) {
          console.error('Error fetching student details:', error);
        }
      };
    getStudentDetails();
  }, [getStudentById, studentId]);

  

  const handleDelete = () => {
    deleteStudent(studentId)
      .then(() => {
        console.log('Student deleted successfully');
        navigate('/studentspage');
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  return (
    <div>
      <h2>Delete Student</h2>
      <p>Are you sure you want to delete the student: {studentData.name}?</p>
      <button onClick={handleDelete}>Confirm Delete</button>
      <Link to={`/studentspage/${studentId}/edit`}>Cancel</Link>
    </div>
  );
}

export default DeleteStudent;
