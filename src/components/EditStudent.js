import React, { useState, useEffect } from 'react';
import { useStudentTeacherContext } from '../context/StudentTeacherContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditStudent() {
  const { getStudentById, editStudent } = useStudentTeacherContext();
  const { studentId } = useParams(); 
  const navigate=useNavigate();

  const [studentData, setStudentData] = useState({ name: '', age: '' });

  
  useEffect(() => {
    getStudentDetails(studentId);
  }, [getStudentById, studentId,getStudentDetails]);

  const getStudentDetails = async (studentId) => {
    try {
      const student = await getStudentById(studentId);
      setStudentData({ name: student.name, age: student.age });
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editStudent(studentId, studentData)
      .then(() => {
       
        console.log('Student details updated successfully');
        navigate('/studentspage')
      })
      .catch((error) => {
        console.error('Error updating student details:', error);
      });
     
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={studentData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={studentData.age}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditStudent;
