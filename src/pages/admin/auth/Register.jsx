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
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-xl font-bold">Register</h1>
      <form className="w-full max-w-sm" onSubmit={handleRegister}>
        <input
          required
          className="mb-2 w-full border p-2"
          name="username"
          placeholder="Username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          required
          className="mb-2 w-full border p-2"
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          required
          className="mb-4 w-full border p-2"
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <button
          className="w-full rounded bg-blue-600 p-2 text-white"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
