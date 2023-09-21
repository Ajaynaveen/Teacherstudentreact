import React, { useState, useEffect } from 'react';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditTeacher() {
  const { getTeacherById, editteacher } = useStudentTeacherContext();
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const [teacherData, setTeacherData] = useState({ name: '', subject: '' });

  useEffect(() => {
    getTeacherDetails(teacherId);
  }, [getTeacherById, teacherId]);

  const getTeacherDetails = async (teacherId) => {
    try {
      const teacher = await getTeacherById(teacherId);
      setTeacherData({ name: teacher.name, subject: teacher.subject });
    } catch (error) {
      console.error('Error fetching teacher details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editteacher(teacherId, teacherData)
      .then(() => {
        console.log('Teacher details updated successfully');
        navigate('/teacherspage');
      })
      .catch((error) => {
        console.error('Error updating teacher details:', error);
      });
  };

  return (
    <div>
      <h2>Edit Teacher</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={teacherData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={teacherData.subject}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditTeacher;
