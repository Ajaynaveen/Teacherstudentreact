import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import { StudentTeacherProvider } from '../context/StudentTeacherContext';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Student from './Student';
import Teacher from './Teacher';

function Dashboard() {
  const location = useLocation();
  const [isloggedin, setisloggedin] = useState(() => {
    // Retrieve the login status from local storage when the component loads
    const storedLoginStatus = localStorage.getItem('isloggedin');
    return storedLoginStatus === 'true';
  });

  const handleLogin = () => {
    setisloggedin(true);
    // Store the login status in local storage when the user logs in
    localStorage.setItem('isloggedin', 'true');
  };

  const handleLogout = () => {
    setisloggedin(false);
    // Remove the login status from local storage when the user logs out
    localStorage.removeItem('isloggedin');
  };

  useEffect(() => {
    if (location.pathname === '/studentspage' || location.pathname === '/teacherspage') {
      // Check the login status and redirect to the login page if not logged in
      if (!isloggedin) {
        return <Navigate to="/" />;
      }
    }
  }, [isloggedin, location.pathname]);

  return (
    <StudentTeacherProvider>
      <div>
        {isloggedin ? (
          <div>
            <h1>Student and Teacher Management</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/studentspage">Students</Link>
                </li>
                <li>
                  <Link to="/teacherspage">Teachers</Link>
                </li>
              </ul>
            </nav>
            <button onClick={handleLogout}>Logout</button>
            <Routes>
              <Route path="/studentspage" element={<Student />} />
              <Route path="/teacherspage" element={<Teacher />} />
            </Routes>
          </div>
        ) : (
          <div>
            <AdminLogin onLogin={handleLogin} />
          </div>
        )}
      </div>
    </StudentTeacherProvider>
  );
}

export default Dashboard;
