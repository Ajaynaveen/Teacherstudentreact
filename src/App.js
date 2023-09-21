import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Student from './components/Student';
import Teacher from './components/Teacher';
import EditStudent from './components/EditStudent';
import DeleteStudent from './components/DeleteStudent';
import { StudentTeacherProvider } from './context/StudentTeacherContext'; 
import StudentList from './components/StudentList';
import ShowStudent from './components/ShowStudent';
import ShowTeacher from './components/ShowTeacher';

import EditTeacher from './components/EditTeacher';
import DeleteTeacher from './components/DeleteTeacher';
function App() {
  return (
    <Router>
      <StudentTeacherProvider> {/* Wrap your entire app with the context provider */}
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/studentsList" element={<StudentList />} />
            <Route path="/studentspage" element={<Student />} />

          
            <Route path="/studentspage/:studentId/edit" element={<EditStudent />} />
            <Route path="/teacherspage/:teacherId/edit" element={<EditTeacher />} />
            <Route path="/studentspage/:studentId/delete" element={<DeleteStudent/>}/>
            <Route path="/teacherspage/:teacherId/delete" element={<DeleteTeacher/>}/>
            <Route path="/studentspage/:studentId" element={<ShowStudent/>}/>
            <Route path="/teacherspage/:teacherId" element={<ShowTeacher/>}/>
            <Route path="/teacherspage" element={<Teacher />} />

          </Routes>
        </div>
      </StudentTeacherProvider> {/* Close the context provider */}
    </Router>
  );
}

export default App;
