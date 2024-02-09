import React, { useState } from 'react';

const LoginForm = ({ onLogin, error }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
        
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
