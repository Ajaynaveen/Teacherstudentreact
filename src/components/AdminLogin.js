import React, { useState } from 'react';

function AdminLogin({ onLogin }) {
  const [admin, setAdmin] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (admin.username === "admin" && admin.password === "password") {
      onLogin(true);
    } else {
      onLogin(false);
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={admin.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button> {/* Add a submit button */}
      </form>
    </div>
  );
}

export default AdminLogin;
