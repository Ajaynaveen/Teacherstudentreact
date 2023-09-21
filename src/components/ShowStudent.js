import React, { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';

function ShowStudent() {
  const { getStudentById } = useStudentTeacherContext();
  const { studentId } = useParams();

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

  
  return (
    <div>
      <h2>Student Details</h2>
      <p>Name: {studentData.name}</p>
      <p>Age: {studentData.age}</p>
      <Link to={`/studentspage/`}>studentspage</Link>
      
    </div>
  );
}

export default ShowStudent;
