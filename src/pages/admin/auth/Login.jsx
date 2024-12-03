import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '@store/features/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulasi login
    if (username === 'admin' && password === 'admin123') {
      dispatch(login());
      localStorage.setItem('token', 'mock-token'); // Simpan token ke localStorage
      navigate('/dashboard'); // Redirect ke halaman admin setelah login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-xl font-bold">Login</h1>
      <input
        className="mb-2 border p-2"
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="mb-4 border p-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="rounded bg-blue-600 p-2 text-white"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
