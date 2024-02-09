import React, { useState } from 'react';

const RegistrationForm = ({ onRegister, error }) => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData);
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
        <label htmlFor="username" style={{ marginRight: '10px' }}>Username:</label>
        <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} required style={{ marginRight: '20px' }} />
        
        <label htmlFor="email" style={{ marginRight: '10px' }}>Email:</label>
        <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required style={{ marginRight: '20px' }} />
        
        <label htmlFor="password" style={{ marginRight: '10px' }}>Password:</label>
        <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required style={{ marginRight: '20px' }} />
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
