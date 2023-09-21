import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';

function ShowTeacher() {
  const { getTeacherById } = useStudentTeacherContext();
  const { teacherId } = useParams();

  const [teacherData, setTeacherData] = useState({ name: '', subject: '' });

  useEffect(() => {
    const getTeacherDetails = async () => {
        try {
          const teacher = await getTeacherById(teacherId);
          if (teacher) {
            setTeacherData({ name: teacher.name, subject: teacher.subject });
          } else {
            console.error('Teacher not found');
          }
        } catch (error) {
          console.error('Error fetching teacher details:', error);
        }
      };
    getTeacherDetails();
  }, [getTeacherById, teacherId]);

 

  return (
    <div>
      <h2>Teacher Details</h2>
      <p>Name: {teacherData.name}</p>
      <p>Subject: {teacherData.subject}</p>
      <Link to={`/teacherspage/`}>teacherspage</Link>
    </div>
  );
}

export default ShowTeacher;
