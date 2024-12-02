import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { register } from '@store/features/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      dispatch(register(formData)); // Simpan data registrasi (opsional)
      alert('Registration successful! Redirecting to login...');
      navigate('/login'); // Redirect ke halaman login
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form className="w-full max-w-sm" onSubmit={handleRegister}>
        <input
          required
          className="border p-2 mb-2 w-full"
          name="username"
          placeholder="Username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          required
          className="border p-2 mb-2 w-full"
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          required
          className="border p-2 mb-4 w-full"
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          className="bg-blue-600 text-white p-2 rounded w-full"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
