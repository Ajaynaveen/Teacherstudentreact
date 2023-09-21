
import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentTeacherContext = createContext();

export function useStudentTeacherContext() {
  return useContext(StudentTeacherContext);
}

export function StudentTeacherProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:3002/students')
      .then((response) => response.json())
      .then((data) => setStudents(data));

    fetch('http://localhost:3002/teachers')
      .then((response) => response.json())
      .then((data) => setTeachers(data));
  }, []);

  const addStudent = (newStudent) => {
    
    fetch('http://localhost:3002/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add student');
        }
        return response.json();
      })
      .then((data) => {
       
        setStudents([...students, data]);
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };
  
  
  const addTeacher = (newTeacher) => {
    
    fetch('http://localhost:3002/teachers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTeacher),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add teacher');
        }
        return response.json();
      })
      .then((data) => {
        
        setTeachers([...teachers, data]);
      })
      .catch((error) => {
        console.error('Error adding teacher:', error);
      });
  };
  const editStudent = async(studentId, updatedStudent) => {
    return fetch(`http://localhost:3002/students/${studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update student');
        }
        return response.json(); 
      })
      .then((updatedData) => {
        const updatedStudents = students.map((student) =>
          student.id === studentId ? updatedData : student
        );
        setStudents(updatedStudents);
        return updatedData; 
      });
  };
  const editteacher = async(teacherId, updatedTeacher) => {
    return fetch(`http://localhost:3002/teachers/${teacherId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTeacher),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update teacher');
        }
        return response.json(); // Parse the response JSON
      })
      .then((updatedData) => {
        const updatedTeachers = teachers.map((teacher) =>
          teacher.id === teacherId ? updatedData : teacher
        );
        setTeachers(updatedTeachers);
        return updatedData; 
      });
  };
  
  const getStudentById = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:3002/students/${studentId}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Return null to indicate that the student was not found
        } else {
          throw new Error('Failed to fetch student details');
        }
      }
      const student = await response.json();
      return student;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };
  const getTeacherById = async (teacherId) => {
    try {
      const response = await fetch(`http://localhost:3002/teachers/${teacherId}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Return null to indicate that the teacher was not found
        } else {
          throw new Error('Failed to fetch teacher details');
        }
      }
      const teacher = await response.json();
      return teacher;
    } catch (error) {
      console.error('Error fetching teacher:', error);
      throw error;
    }
  };
  
  
  const deleteStudent = (studentId, setStudents) => {
    return fetch(`http://localhost:3002/students/${studentId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        return response.json(); 
      })
      
      .then(() => {
        
        const updatedStudents = students.filter((student) => student.id !== studentId);
        setStudents(updatedStudents);
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };
  const deleteteacher = (teacherId, setTeachers) => {
    return fetch(`http://localhost:3002/teachers/${teacherId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete teacher');
        }
        return response.json(); 
      })
      
      .then(() => {
        
        const updatedTeachers = teachers.filter((teacher) => teacher.id !== teacherId);
        setTeachers(updatedTeachers);
      })
      .catch((error) => {
        console.error('Error deleting teacher:', error);
      });
  };
  
  

  return (
    <StudentTeacherContext.Provider
      value={{
        students,
        teachers,
        addStudent,
        addTeacher,
        editStudent,
        getStudentById,
        deleteStudent,
        editteacher,getTeacherById,
        deleteteacher
    

       
      }}
    >
      {children}
    </StudentTeacherContext.Provider>
  );
}
