import React, { useState } from 'react';
import API from '../utils/api';
import '../ComponentsStyles/RegisterForm.css'; // Importing CSS for styling

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      setMessage('Registered successfully.');
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
