import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';

function DeleteTeacher() {
  const { getTeacherById, deleteteacher } = useStudentTeacherContext();
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const [teacherData, setTeacherData] = useState({ name: '', subject: '' });

  useEffect(() => {
    getTeacherDetails(teacherId);
  }, [getTeacherById, teacherId]);

  const getTeacherDetails = async (teacherId) => {
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

  const handleDelete = () => {
    deleteteacher(teacherId)
      .then(() => {
        console.log('Teacher deleted successfully');
        navigate('/teacherspage');
      })
      .catch((error) => {
        console.error('Error deleting teacher:', error);
      });
  };

  return (
    <div>
      <h2>Delete Teacher</h2>
      <p>Are you sure you want to delete the teacher: {teacherData.name}?</p>
      <button onClick={handleDelete}>Confirm Delete</button>
      <Link to={`/teacherspage/${teacherId}/edit`}>Cancel</Link>
    </div>
  );
}

export default DeleteTeacher;
