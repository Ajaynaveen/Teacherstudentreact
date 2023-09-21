import React from 'react'
import { StudentTeacherProvider } from '../context/StudentTeacherContext';
import TeacherList from './TeacherList';
import AddTeacherForm from './AddTeacherForm';
function Teacher() {
  return (
    <StudentTeacherProvider>
        <div>
        <TeacherList/>
        <AddTeacherForm/>
        </div>
        
    
    
    
    </StudentTeacherProvider>
    
  )
}

export default Teacher